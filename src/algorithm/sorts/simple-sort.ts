import { swap } from '@/algorithm/utils';

/**
 * 冒泡排序(升序)
 * 原地排序
 * 时间复杂度 O(n^2)
 */
export function bubbleSort(numbers: number[]) {
  // numbers.length - 1 是因为 n 个数字，只需要外循环 n - 1 次即可
  for (let i = 0; i < numbers.length - 1; i++) {
    // 注意上限 numbers.length - i - 1, - i 是因为之前已排完 i 个数的位置了
    for (let j = 0; j < numbers.length - i - 1; j++) {
      if (numbers[j] > numbers[j + 1]) {
        swap(numbers, j + 1, j);
      }
    }
  }
}

/**
 * 冒泡改进
 * 设置一标志性变量 pos,用于记录每趟排序中最后一次进行交换的位置。
 * 由于 pos 位置之后的记录均已交换到位,故在进行下一趟排序时只要扫描到 pos 位置即可。
 */
export function bubbleSort2(arr: number[]) {
  //初始时,最后位置保持不变
  let i = arr.length - 1;
  while (i > 0) {
    //每趟开始时,无记录交换
    let pos = 0;
    for (let j = 0; j < i; j++)
      if (arr[j] > arr[j + 1]) {
        //每趟开始时,无记录交换
        pos = j;
        swap(arr, j, j + 1);
      }
    //为下一趟排序作准备
    i = pos;
  }
  return arr;
}

/**
 * 选择排序（升序）
 * 原地排序
 * 时间复杂度 O(n^2)
 */
export function selectSort(numbers: number[]) {
  for (let i = 0; i < numbers.length; i++) {
    let minIndex = i;
    for (let j = i; j < numbers.length; j++) {
      if (numbers[j] < numbers[minIndex]) {
        minIndex = j;
      }
    }
    // 找到最小值，替换
    swap(numbers, minIndex, i);
  }
}

/**
 * 插入排序
 * 思路：原地构造有序+无序数组，拿无序数组的某一项，在有序数组里找相应位置
 * 优化思路：找位置用二分找
 * @param arr
 */
export function insertionSort(arr: number[]) {
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > current) {
      swap(arr, j, j + 1);
      j--;
    }
    arr[j + 1] = current;
  }
}
