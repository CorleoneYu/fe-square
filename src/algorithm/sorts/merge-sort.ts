/**
 * 归并排序
 * 时间复杂度：N * logN
 * 空间复杂度：N
 * link p4 https://www.bilibili.com/video/BV13g41157hK?p=4&vd_source=7e817e5170ca4a2b16683f214bdf65c5
 * @param arr 待排序数组，原地排
 * @param left 
 * @param right 
 */
export function mergeSort(arr: number[], left: number, right: number) {
  if (left === right) {
    return;
  }

  // 这样运算可防止溢出
  const middle = left + Math.floor((right - left) / 2);
  mergeSort(arr, left, middle);
  mergeSort(arr, middle + 1, right);

  merge(arr, left, middle, right);
}

/**
 * 合并两个有序数组
 * @param arr 左部分已有序，右部分已有序
 */
function merge(arr: number[], left: number, middle: number, right: number) {
  const helper: number[] = [];
  let p1 = left;
  let p2 = middle + 1;

  while (p1 <= middle && p2 <= right) {
    helper.push(arr[p1] <= arr[p2] ? arr[p1++] : arr[p2++]);
  }

  while (p1 <= middle) {
    helper.push(arr[p1++]);
  }

  while (p2 <= right) {
    helper.push(arr[p2++]);
  }

  // 将排序后的值赋值给原数组
  for (let i = 0; i < helper.length; i++) {
    arr[i + left] = helper[i];
  }
}

function main() {
  const values = [3, 5, 1, 4, 2, 6, 9, 10, 7, 1];
  mergeSort(values, 0, values.length - 1);
  console.log('values', values);
}

main();
