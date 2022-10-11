import Delta from '@/delta-based-editor/data/delta';
import { IFormatProps } from '@/delta-based-editor/modules/formats/interface';

export interface IDeltaBasedEditor {
  getDelta(): Delta;
  setFormat(key: string, value: string | number): void;
  getFormat(): IFormatProps;
}

export interface IDeltaBasedEditorProps {
  inputContainer: HTMLDivElement;
  id: string;
}