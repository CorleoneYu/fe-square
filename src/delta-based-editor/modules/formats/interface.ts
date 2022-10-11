export interface IFormat<TSetFormat = any, TGetFormat = TSetFormat> {
  getFormat(domNode: HTMLElement): TGetFormat;
  format(domNode: HTMLElement, value: TSetFormat): void;
  remove(domNode: HTMLElement): void;
}

export interface IDeltaStyle {
  bold: boolean;
  italic: boolean;
  fontFamily: string;
  fontSize: number;
  color: string;
  strikethrough: boolean;
  underline: boolean;
}

export type IDeltaStyleKeys = keyof IDeltaStyle;

export type IFormatProps = Partial<IDeltaStyle>;