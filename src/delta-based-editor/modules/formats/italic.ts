import { BaseFormat } from '@/delta-based-editor/modules/formats/abstract/base-format';
import { IFormat } from '@/delta-based-editor/modules/formats/interface';

export class Italic extends BaseFormat implements IFormat<boolean> {
  public static key = 'italic';
  public styleKey = 'fontStyle';
  public styleValue = 'italic';

  public format(domNode: HTMLElement, value: boolean) {
    if (value === false) {
      this.remove(domNode);
      return;
    }

    domNode.style[this.styleKey as any] = this.styleValue;
  }

  public getFormat(domNode: HTMLElement): boolean {
    const viewStyleValue = domNode.style[this.styleKey as any];
    return viewStyleValue === this.styleValue;
  }
}