import { swap } from '@/algorithm/utils';

interface IHeap {
  size: number;
  insert(value: number): void;
  pop(): number | undefined;
  // 堆排：N * logN
  // 思路：先插入、后 pop
  heapSort(arr: number[]): number[];
}

/**
 * 堆 -> 优先级队列
 * 大根堆数组
 * 父元素 index = Math.floor((child's index - 1) / 2)
 * 子元素 rightIndex = (parent's index + 1) * 2
 * 子元素 leftIndex = (parent's index + 1) * 2 - 1
 */
export class HeapArray implements IHeap {
  public size = 0;

  private numbers: number[] = [];

  // 在最后添加，然后往上冒泡
  public insert(value: number): void {
    let index = this.size;
    this.numbers[index] = value;
    while (this.numbers[index] > this.numbers[this.getParentIndex(index)]) {
      swap(this.numbers, index, this.getParentIndex(index));
      index = this.getParentIndex(index);
    }
    this.size++;
  }

  // 取出最上的节点，然后从最后的节点替换最上的，最后进行整理
  public pop(): number | undefined {
    if (this.size === 0) {
      return undefined;
    }

    let result = this.numbers[0];

    const last = this.numbers.pop()!;
    this.size--;
    if (this.size === 0) {
      return result;
    }

    this.numbers[0] = last;
    this.heapify(0);

    return result;
  }

  public heapSort(arr: number[]): number[] {
    this.size = 0;
    this.numbers = [];
    const result = [];

    if (arr.length < 2) {
      return arr;
    }

    for (let i = 0; i < arr.length; i++) {
      this.insert(arr[i]);
    }

    while (this.size > 0) {
      result.push(this.pop()!);
    }
    return result;
  }

  // 整理 index 节点，比较两个子元素，如果父节点小于子元素，则交换
  private heapify(index: number) {
    let leftIndex = index * 2 + 1;

    while (leftIndex < this.size) {
      let largestIndex = leftIndex;

      // 两个孩子中，谁的值大所对应的下标
      if (leftIndex + 1 < this.size && this.numbers[leftIndex + 1] > this.numbers[leftIndex]) {
        // 右孩子较大
        largestIndex = leftIndex + 1;
      }

      if (this.numbers[index] > this.numbers[largestIndex]) {
        // 父元素较大
        break;
      }

      swap(this.numbers, index, largestIndex);
      index = largestIndex;
      leftIndex = index * 2 + 1;
    }
  }

  private getParentIndex(index: number) {
    return Math.floor((index - 1) / 2);
  }
}
