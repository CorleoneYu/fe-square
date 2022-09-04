import { BaseFormat } from '@/delta-based-editor/modules/formats/abstract/base-format';
import { IFormat } from '@/delta-based-editor/modules/formats/interface';

export class FontSize extends BaseFormat implements IFormat<number> {
  public static key = 'fontSize';
  public styleKey = 'fontSize';

  public format(domNode: HTMLElement, value: number): void {
    const fontSize = `${value}pt`;
    domNode.style[this.styleKey as any] = fontSize;
  }

  public getFormat(domNode: HTMLElement): number {
    const styleValue = domNode.dataset[this.styleKey];
    if (styleValue === undefined) {
      return 0;
    }

    return Number(styleValue.replace('pt', ''));
  }
}