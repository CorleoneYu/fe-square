import { BaseFormat } from '@/delta-based-editor/modules/formats/abstract/base-format';
import { IFormat } from '@/delta-based-editor/modules/formats/interface';

/**
 * 删除线
 */
export class StrikeThrough extends BaseFormat implements IFormat<boolean> {
  public static key = 'strikethrough';
  public styleKey = 'textDecoration';
  public styleValue = 'line-through';

  public format(domNode: HTMLElement, value: boolean): void {
    if (value === false) {
      this.remove(domNode);
      return;
    }

    const currentStyleValue = domNode.style[this.styleKey as any];
    const strikeThroughValue = `${currentStyleValue} ${this.styleValue}`;
    domNode.style[this.styleKey as any] = strikeThroughValue;
  }

  public override remove(domNode: HTMLElement): void {
    const currentStyleValue = domNode.style[this.styleKey as any];
    // textDecoration 只有 line-through 的话，直接删除
    if (currentStyleValue?.trim() === this.styleValue) {
      super.remove(domNode);
      return;
    }

    // textDecoration 去掉 line-through 的部分
    const updatedValue = currentStyleValue?.replace(this.styleValue, '').trim();
    domNode.style[this.styleKey as any] = updatedValue;
  }

  public getFormat(domNode: HTMLElement): boolean {
    const viewStyleValue = domNode.style[this.styleKey as any];
    return !!viewStyleValue?.includes(this.styleValue.trim());
  }
}