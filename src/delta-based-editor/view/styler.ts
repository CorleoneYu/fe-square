import { IFormat } from '@/delta-based-editor/modules/formats/interface';

export class Styler {
  private formats: Record<string, IFormat> = {};

  public getFormats() {
    return this.formats;
  }

  public addFormat(key: string, format: IFormat) {
    this.formats[key] = format;
  }

  public setStyle(domNode: HTMLElement, key: string, value: any) {
    this.formats[key]?.format(domNode, value);
  }

  public getStyle(domNode: HTMLElement, key: string) {
    return this.formats[key]?.getFormat(domNode);
  }

  public removeStyle(domNode: HTMLElement, key: string) {
    return this.formats[key]?.remove(domNode);
  }

  public getStyles(domNode: HTMLElement, excludes: string[] = []) {
    const values: Record<string, any> = {};
    for (const [key, format] of Object.entries(this.formats)) {
      if (excludes.includes(key)) {
        continue;
      }

      const value = format.getFormat(domNode);
      values[key] = value;
    }

    return values;
  }
}