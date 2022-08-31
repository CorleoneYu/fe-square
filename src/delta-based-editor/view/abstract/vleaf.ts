import VNode from '@/delta-based-editor/view/abstract/vnode';

/**
 * 叶子节点。
 * - 没有 children
 * - 叶子节点需要有值 value()
 * - 与 VContainer 互斥
 */
export abstract class VLeaf extends VNode {
  public abstract value(): any;
}