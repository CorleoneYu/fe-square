import { BaseFormat } from '@/delta-based-editor/modules/formats/abstract/base-format';
import { IFormat } from '@/delta-based-editor/modules/formats/interface';

export class FontFamily extends BaseFormat implements IFormat<string, string | undefined> {
  public static key = 'fontFamily';
  public styleKey = 'fontFamily';

  public format(domNode: HTMLElement, value: string): void {
    domNode.style[this.styleKey as any] = value;
  }

  public getFormat(domNode: HTMLElement): string | undefined {
    return domNode.dataset[this.styleKey];
  }
}