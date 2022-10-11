export interface IPosition {
  node: Node;
  offset: number;
}

export interface INormalizedNativeRange {
  start: IPosition;
  end: IPosition;
  native: Range;
}

export interface INativeRangeArgs {
  startNode: Node;
  startOffset: number;
  endNode?: Node;
  endOffset: number;
}

export interface IEditorRange {
  getStart(): number;
  getEnd(): number;
  getLength(): number;
  equals(range: IEditorRange): boolean;
  isCollapsed(): boolean;
}

export interface ISelection {
  /**
   * 清空选区
   */
  clear(): void;
  /**
   * 输入框是否处于 focus
   */
  hasFocus(): boolean;
  /**
   * 输入框 focus
   */
  focus(): void;
  /**
   * 输入框 blur
   */
  blur(): void;

  getRange(): [IEditorRange, INormalizedNativeRange] | [null, null];

  /**
   * 光标聚焦情况下，设置格式
   */
  format(formatKey: string, value: string | number | boolean): void;
}