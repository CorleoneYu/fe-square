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
}