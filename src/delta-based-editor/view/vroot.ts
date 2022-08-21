import { getVNodeFromDomNode } from '@/delta-based-editor/utils/view';
import { VBlock } from '@/delta-based-editor/view/vblock';
import { VContainer } from '@/delta-based-editor/view/vcontainer';
import VNode from '@/delta-based-editor/view/vnode';

/**
 * view 层的根节点
 * - 一个 Editor 只有一个 vRoot
 * - 通过 MutationObserver 负责监听 Dom 变化
 */
export class VRoot extends VContainer {
  public static tagName = 'DIV';

  private mutationObserver!: MutationObserver;

  public static createDomNode() {
    return document.createElement(VRoot.tagName);
  }

  public constructor(domNode: Node) {
    super(domNode);
    this.root = this;
    this.startMutationObserver();

    this.clean();
  }

  public clean() {
    for (const child of this.children) {
      child.remove();
    }
    this.optimize();
  }

  public remove() {
    throw new Error('root node cannot be removed');
  }

  public insertBefore(childVNode: VNode, refChild?: VNode | null) {
    if (!(childVNode instanceof VBlock)) {
      throw new Error('root node can only insert block');
    }

    super.insertBefore(childVNode, refChild);
  }

  /**
   * 把整个 Dom 的内容同步到 vTree，并且进行整理。
   */
  public sync(mutations?: MutationRecord[], shouldIgnoreComposing?: boolean) {
    const context = {};
    mutations = mutations || this.mutationObserver.takeRecords();

    if (mutations.length === 0) {
      return;
    }

    mutations.map((mutation: MutationRecord) => {
      const vNode = getVNodeFromDomNode(mutation.target, true);
      if (!vNode) {
        return null;
      }

      // 此次更新中第一次遇到这个 vNode, 创建 mutations 数组
      if (!vNode.mutations) {
        vNode.mutations = [mutation];
        return vNode;
      }

      // 第二次遇到这个 vNode
      vNode.mutations.push(mutation);
      // 返回 null，因为之前已经遇到过来
      return null;
    }).forEach((vNode: VNode | null) => {
      if (!vNode || vNode === this) {
        return;
      }

      vNode.update(context);
    });

    if (this.mutations) {
      this.update(context);
    }

    this.optimize(context);
  }

  public optimize(context: Record<string, any> = {}) {
    super.optimize(context);

    if (this.children.getSize() === 0) {
      const child = new VBlock(VBlock.createDomNode());
      this.insertBefore(child);
      child.optimize(context);
    }
  }

  private startMutationObserver() {
    this.mutationObserver = new MutationObserver((mutationList) => {
      console.log('mutation', mutationList);
      // this.sync(mutationList);
    });

    this.mutationObserver.observe(this.domNode, {
      subtree: true,
      childList: true,
      attributes: true,
      characterData: true,
      characterDataOldValue: true,
    })
  }
}
