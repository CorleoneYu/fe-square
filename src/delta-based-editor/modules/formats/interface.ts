export interface IFormat<TSetFormat = any, TGetFormat = TSetFormat> {
  getFormat(domNode: HTMLElement): TGetFormat;
  format(domNode: HTMLElement, value: TSetFormat): void;
  remove(domNode: HTMLElement): void;
}