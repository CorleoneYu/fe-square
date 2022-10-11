import { IEditorRange } from '@/delta-based-editor/core/selection/interface';

export class EditorRange implements IEditorRange {
  private start: number;
  private end: number;

  public constructor(start: number, end: number) {
    this.start = Math.min(start, end);
    this.end = Math.max(start, end);
  }

  public getStart(): number {
    return this.start;
  }

  public getEnd(): number {
    return this.end;
  }

  public getLength(): number {
    return this.end - this.start;
  }

  public equals(range: EditorRange): boolean {
    return range.start === this.start && range.end === this.end;
  }

  public isCollapsed(): boolean {
    // 是否光标状态
    return this.start === this.end;
  }
}