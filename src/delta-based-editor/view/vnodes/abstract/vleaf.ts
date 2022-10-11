import VNode from '@/delta-based-editor/view/vnodes/abstract/vnode';

/**
 * 叶子节点。
 * - 没有 children
 * - 叶子节点需要有值 value()
 * - 与 VContainer 互斥
 */
export abstract class VLeaf extends VNode {
  public abstract value(): any;

  /**
   * 获取当前节点对应的 nativeRange
   */
  public abstract getNativeRangePosition(index: number): [Node, number];

  /**
   * 从 nativeRange 拿到 offset 位置
   */
  public abstract getOffsetFromNativeRangePosition(node: Node, offset: number): number;
}