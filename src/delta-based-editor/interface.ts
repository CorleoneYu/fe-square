import Delta from '@/delta-based-editor/data/delta';

export interface IDeltaBasedEditor {
  getDelta(): Delta;
}

export interface IDeltaBasedEditorProps {
  inputContainer: HTMLDivElement;
  id: string;
}