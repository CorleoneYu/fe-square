import { createVNodeFromDomNode, getVNodeFromDomNode } from '@/delta-based-editor/utils/view';
import { VLeaf } from '@/delta-based-editor/view/vnodes/abstract/vleaf';
import VNode from '@/delta-based-editor/view/vnodes/abstract/vnode';

const PROCESSING_ADDED_NODES_ERROR = 'Error processing addedNodes';

export class VContainer extends VNode {
  public insertBefore(childVNode: VNode, refChild?: VNode | null) {
    if (childVNode.parent) {
      // 先清理原先的父子关系
      childVNode.parent.children.remove(childVNode);
    }

    // view 层处理
    this.children.insertBefore(childVNode, refChild);
    childVNode.parent = this;
    childVNode.root = this.root;

    // dom 相应处理
    let refDomNode: Node | null = null;
    if (refChild) {
      refDomNode = refChild.domNode;
    }
    if (childVNode.domNode.parentNode !== this.domNode || childVNode.domNode.nextSibling !== refDomNode) {
      this.domNode.insertBefore(childVNode.domNode, refDomNode)
    }
  }

  /**
   * 递归遍历长度
   */
  public length() {
    return this.children.reduce((total, child) => total + child.length(), 0);
  }

  /**
   * 递归获取全部叶子节点
   * @param index 
   * @param length 
   * @returns 
   */
  public getLeaves(index = 0, length = Number.MAX_VALUE): VLeaf[] {
    let leaves: VLeaf[] = [];
    this.children.forEachAt(index, length, (child: VNode, index: number, length: number) => {
      if (child instanceof VLeaf) {
        leaves.push(child);
      } else if (child instanceof VContainer) {
        leaves = leaves.concat(child.getLeaves(index, length));
      }
    })
    return leaves;
  }

  public update(_context: Record<string, any>): void {
    const { mutations } = this;
    if (!mutations) {
      return;
    }

    const addedNodes: Node[] = [];
    const removedNodes: Node[] = [];
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        addedNodes.push(...mutation.addedNodes);
        removedNodes.push(...mutation.removedNodes);
      }
    });

    // 处理被删除的节点
    removedNodes.forEach((node: Node) => {
      const vNode = getVNodeFromDomNode(node);
      if (!vNode) {
        return;
      }
    });

    // 处理添加的节点
    addedNodes.filter((node) => {
      // 需要先 filter detached node
      // e.g. 搜狗输入法剪贴板会同时插入和删除 <br/>
      return !!node.parentNode;
    }).sort((a, b) => {
      // 将 nodes 按树前序遍历的顺序进行排序
      if (a === b) {
        return 0;
      }

      // 前序遍历中，祖先先被遍历
      if (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_CONTAINED_BY) {
        // a 包含了 b，即 a 是 b 的祖先节点
        return -1;
      }
      if (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_CONTAINS) {
        return 1;
      }

      // 前序遍历中, 兄弟节点偏后的先被处理？
      if (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_PRECEDING) {
        return -1;
      }
      if (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) {
        return 1;
      }

      return 0
    }).forEach((node) => {
      try {
        // 大部分情况下，vnode 通过 api 新加，所以在移动/创造节点的时候已经处理了节点关系
        // 此处需要处理特殊的用户操作导致的 DOM 的节点新增
        // e.g. Android 搜狗输入法的剪贴板功能
        const parentVNode = getVNodeFromDomNode(node.parentNode);
        if (!parentVNode) {
          throw new Error(PROCESSING_ADDED_NODES_ERROR);
        }

        // 先找到索引节点，即是否有已存在的兄弟 vNode
        let refVNode: VNode | null = null;
        if (node.nextSibling) {
          refVNode = getVNodeFromDomNode(node.nextSibling);
        }

        // 是否有已存在的对应 vNode
        let vNode = getVNodeFromDomNode(node);
        if (!vNode) {
          // 不存在的话，则创建新 vNode
          vNode = createVNodeFromDomNode(node);
        }

        if (!VNode) {
          throw new Error(PROCESSING_ADDED_NODES_ERROR);
        }

        if (vNode.next !== refVNode || vNode.parent !== parentVNode) {
          parentVNode.insertBefore(vNode, refVNode);
        }

      } catch (e: any) {
        console.log('[vContainer|update]Error', e);
        if (e.message === PROCESSING_ADDED_NODES_ERROR) {
          node.parentNode?.removeChild(node);
          return;
        }

        throw e;
      }
    })
  }

  public optimize(context: Record<string, any>): void {
    super.optimize(context);
    for (const child of this.children) {
      child.optimize(context);
    }
  }
}