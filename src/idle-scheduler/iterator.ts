export interface IIterator<T> {
  next: () => T | null;
}

/**
 * 顺序迭代器
 */
export class SequentalIterator implements IIterator<number> {
  private current = -1;
  private readonly end: number;
  public constructor(length: number) {
    this.end = length;
  }

  public next(): number | null {
    this.current += 1;
    return this.current < this.end ? this.current : null;
  }
}
