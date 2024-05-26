/**
 * links https://leetcode.cn/problems/zui-xiao-de-kge-shu-lcof/solution/zui-xiao-de-kge-shu-by-leetcode-solution/
 * topK 问题
 * 思路 1：排序后取 k，时间 O(N*logN) 空间 O(logN)
 * 思路 2：堆，建立大根堆，维护前 k 个数，最后取出， 时间 O(N*logK) 空间 O(k)
 * 思路 3：快排思想 时间 O(n) 空间 O(n)
 * @param arr
 * @param k
 */

import { swap } from '@/algorithm/utils';

// 大根堆解法
export function smallestK1(arr: number[], k: number): number[] {
  if (k === 0) {
    return [];
  }

  if (k >= arr.length) {
    return arr;
  }

  const heap = new Heap();
  // 先插入 k 个元素
  for (let i = 0; i < k; i++) {
    heap.insert(arr[i]);
  }

  // 有要求的插入
  for (let i = k; i < arr.length; i++) {
    const top = heap.getTop()!;
    if (top < arr[i]) {
      continue;
    }
    heap.pop();
    heap.insert(arr[i]);
  }

  // 从堆中获取 k 个数
  const result: number[] = [];
  for (let i = 0; i < k; i++) {
    result.push(heap.pop()!);
  }
  return result;
}

// 大根堆
class Heap {
  private numbers: number[] = [];

  public getTop(): number | undefined {
    return this.numbers[0];
  }

  /**
   * 在末尾增加，然后向上找合适的位置
   * @param value
   */
  public insert(value: number) {
    let index = this.numbers.length;
    let parentIndex = this.getParentIndex(index);
    this.numbers.push(value);

    while (this.numbers[parentIndex] < this.numbers[index]) {
      swap(this.numbers, index, parentIndex);
      index = parentIndex;
    }
  }

  /**
   * 取第一个值，然后将最后一个值换到第一位，之后向下找合适的位置
   */
  public pop(): number | undefined {
    const result = this.numbers.shift();
    if (result === undefined) {
      return result;
    }

    const lastValue = this.numbers.pop();
    if (lastValue === undefined) {
      return result;
    }

    // 最后一个值塞入第一位
    this.numbers.unshift(lastValue);
    // 向下找合适的位置
    this.heapify(0);

    return result;
  }

  /**
   * 将 index 向下找到合适的位置
   * @param index
   */
  private heapify(index: number) {
    let size = this.numbers.length;
    let leftIndex = index * 2 + 1;

    while (leftIndex < size) {
      // 两个孩子中，谁的值大所对应的下标
      let largestIndex = leftIndex;
      if (leftIndex + 1 < size && this.numbers[leftIndex + 1] > this.numbers[leftIndex]) {
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
    return Math.ceil(index / 2) - 1;
  }
}

describe('smallestK', () => {
  it('test', () => {
    const result = smallestK1([1, 3, 5, 7, 2, 4, 6, 8], 4);
    expect(result.sort()).toEqual([1, 2, 3, 4]);
  });
});

export function smallestK(arr: number[], k: number) {
  if (k === 0) {
    return [];
  }

  if (k >= arr.length) {
    return arr;
  }

  solution(arr, k, 0, arr.length - 1);
  return arr.slice(0, k);
}

/**
 * 将 arr 前 k 小的树放在左区间
 */
function solution(arr: number[], k: number, left: number, right: number) {
  if (left >= right) {
    return;
  }

  // 随机选 index
  const randomIndex = Math.floor(Math.random() * (right - left)) + left;
  swap(arr, right, randomIndex);
  const partitionIndex = partition(arr, left, right);

  // 完全满足
  if (partitionIndex - left + 1 === k) {
    return;
  }

  // 左半部分满足，右半部分继续排
  if (partitionIndex - left + 1 < k) {
    solution(arr, k - (partitionIndex - left + 1), partitionIndex + 1, right);
    return;
  }

  // 左半部分找 k 个元素
  solution(arr, k, left, partitionIndex - 1);
}

function partition(arr: number[], left: number, right: number): number {
  const key = arr[right];
  let less = left - 1;
  for (let j = left; j < right; j++) {
    if (arr[j] <= key) {
      swap(arr, j, less + 1);
      less++;
    }
  }
  // 最后把 right 交换到 less + 1
  swap(arr, less + 1, right);
  return less + 1;
}
