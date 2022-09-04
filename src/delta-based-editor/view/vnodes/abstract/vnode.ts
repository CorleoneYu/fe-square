import { LinkedList, LinkedNode } from '@/delta-based-editor/utils/linked-list';
import { VNODE_KEY } from '@/delta-based-editor/utils/view';
import { VRoot } from '@/delta-based-editor/view/vnodes/vroot';

export default abstract class VNode extends LinkedNode<VNode> {
  public children: LinkedList<VNode> = new LinkedList<VNode>();
  public parent!: VNode;
  public domNode: Node;
  public root!: VRoot;
  public mutations?: MutationRecord[];

  public constructor(domNode: Node) {
    super();
    this.domNode = domNode;
    domNode[VNODE_KEY] = this;
  }

  public getStyler() {
    return this.root.styler;
  }

  /**
   * 完全把自身移除。
   * 在 DOM 中移除并且同时需要在 view 层中同步移除
   */
  public remove() {
    this.domNode.parentNode?.removeChild(this.domNode);
    this.detach();
  }

  /**
   * 在 view 层中移除
   */
  public detach() {
    this.parent.children.remove(this);
    delete this.domNode[VNODE_KEY];
  }

  /**
   * 这个方法需要做以下事情
   * - 清理 cached mutations
   * - 为空时处理 default child 或者 remove
   */
  public optimize(_context: Record<string, any>): void {
    this.mutations = undefined;
  }

  /**
   * vNode 的长度
   */
  public abstract length(): number;

  /**
   * 当 dom 更新时，需要更新响应的 VNode
   */
  public abstract update(context: Record<string, any>): void;

  /**
   * 插入一个子节点到给点节点之前。
   */
  public abstract insertBefore(childNode: VNode, refChild?: VNode | null): void;
}