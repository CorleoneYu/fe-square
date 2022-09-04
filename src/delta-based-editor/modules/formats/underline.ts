import { BaseFormat } from '@/delta-based-editor/modules/formats/abstract/base-format';
import { IFormat } from '@/delta-based-editor/modules/formats/interface';

/**
 * 下划线
 */
export class UnderLine extends BaseFormat implements IFormat<boolean> {
  public static key = 'underline';
  public styleKey = 'textDecoration';
  public styleValue = 'underline';

  public format(domNode: HTMLElement, value: boolean): void {
    if (value === false) {
      this.remove(domNode);
      return;
    }

    const currentStyleValue = domNode.style[this.styleKey as any];
    const underLineValue = `${currentStyleValue} ${this.styleValue}`;
    domNode.style[this.styleKey as any] = underLineValue;
  }

  public override remove(domNode: HTMLElement): void {
    const currentStyleValue = domNode.style[this.styleKey as any];
    // textDecoration 只有 underline 的话，直接删除
    if (currentStyleValue?.trim() === this.styleValue) {
      super.remove(domNode);
      return;
    }

    // textDecoration 去掉 underline 的部分
    const updatedValue = currentStyleValue?.replace(this.styleValue, '').trim();
    domNode.style[this.styleKey as any] = updatedValue;
  }

  public getFormat(domNode: HTMLElement): boolean {
    const viewStyleValue = domNode.style[this.styleKey as any];
    return !!viewStyleValue?.includes(this.styleValue.trim());
  }
}