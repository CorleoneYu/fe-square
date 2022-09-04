export class Range {
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

  public equals(range: Range): boolean {
    return range.start === this.start && range.end === this.end;
  }

  public isCollapsed(): boolean {
    // 是否光标状态
    return this.start === this.end;
  }
}