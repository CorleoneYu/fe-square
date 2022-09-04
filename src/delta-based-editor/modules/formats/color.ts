import { BaseFormat } from '@/delta-based-editor/modules/formats/abstract/base-format';
import { IFormat } from '@/delta-based-editor/modules/formats/interface';

export class Color extends BaseFormat implements IFormat<string, string | undefined> {
  public static key = 'color';
  public styleKey = 'color';

  public format(domNode: HTMLElement, value: string): void {
    domNode.style[this.styleKey as any] = value;
  }

  public getFormat(domNode: HTMLElement): string | undefined {
    return domNode.dataset[this.styleKey];
  }
}