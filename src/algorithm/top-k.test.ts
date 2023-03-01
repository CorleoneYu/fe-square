/**
 * links https://leetcode.cn/problems/zui-xiao-de-kge-shu-lcof/solution/zui-xiao-de-kge-shu-by-leetcode-solution/
 * topK 问题
 * 思路 1：排序后取 k，时间 O(N*logN) 空间 O(logN)
 * 思路 2：堆，建立大根堆，维护前 k 个数，最后取出， 时间 O(N*logK) 空间 O(k)
 * 思路 3：快排思想 时间 O(n) 空间 O(n)
 * @param arr
 * @param k
 */

// 大根堆解法
export function smallestK1(arr: number[], k: number): number[] {
  if (k === 0) {
    return [];
  }

  if (k >= arr.length) {
    return arr;
  }

  const heap = new Heap();
  for (let i = 0; i < k; i++) {
    heap.insert(arr[i]);
  }

  for (let i = k; i < arr.length; i++) {
    const top = heap.getTop()!;
    if (top < arr[i]) {
      continue;
    }
    heap.pop();
    heap.insert(arr[i]);
  }

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
      this.swap(index, parentIndex);
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
      this.swap(index, largestIndex);
      index = largestIndex;
      leftIndex = index * 2 + 1;
    }
  }

  private swap(index: number, targetIndex: number) {
    let temp = this.numbers[index];
    this.numbers[index] = this.numbers[targetIndex];
    this.numbers[targetIndex] = temp;
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
