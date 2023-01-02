import { HeapArray } from '@/algorithm/sorts/heap';
import { mergeSort } from '@/algorithm/sorts/merge-sort';
import { quickSort } from '@/algorithm/sorts/quick-sort';

describe('sort', () => {
  it('merge sort', () => {
    const values = [3, 5, 1, 4, 2, 6, 9, 10, 7, 1];
    mergeSort(values, 0, values.length - 1);
    expect(values).toEqual([1, 1, 2, 3, 4, 5, 6, 7, 9, 10]);
  });

  it('heap sort', () => {
    const heap = new HeapArray();
    const values = heap.heapSort([3, 5, 1, 4, 2, 6, 9, 10, 7, 1]);
    expect(values).toEqual([10, 9, 7, 6, 5, 4, 3, 2, 1, 1]);
  });

  it('quick sort', () => {
    const values = [3, 5, 1, 4, 2, 6, 9, 10, 7, 1];
    quickSort(values);
    expect(values).toEqual([1, 1, 2, 3, 4, 5, 6, 7, 9, 10]);
  });
});
