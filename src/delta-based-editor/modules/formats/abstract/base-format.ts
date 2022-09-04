/**
 * BaseFormat 类提供基本的 format 方法
 */
export abstract class BaseFormat {
  public abstract styleKey: string;

  // 是否屏蔽该样式，先不使用
  protected isHidden: boolean;

  public constructor(isHidden?: boolean) {
    this.isHidden = isHidden || false;
  }

  /**
   * 对 view 层节点进行样式删除
   * @param domNode 样式节点
   */
  public remove(domNode: HTMLElement): void {
    delete domNode.style[this.styleKey as any];
  }
}