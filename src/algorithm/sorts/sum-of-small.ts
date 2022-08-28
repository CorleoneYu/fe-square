/**
 * 归并排序思路
 * 求小和问题
 * 在一个数组中，每个数左边比当前数小的数累加起来，叫做这个数组的小和。
 * 例子：[1, 3, 4, 2, 5] 
 * 1. 左边比 1 小的数，没有
 * 3. 左边比 3 小的数：1
 * 4. 左边比 4 小的数：1, 3 = 4
 * 2. 左边比 2 小的数：1
 * 5. 左边比 5 小的数：1, 3, 4, 2 = 10
 * 所以小和 = 1 + 4 + 1 + 10 = 16
 */
export function sumOfSmall(arr: number[]): number {
  if (arr.length < 2) {
    return 0;
  }

  return process(arr, 0, arr.length - 1);
}

function process(arr: number[], left: number, right: number): number {
  if (left === right) {
    return 0;
  }
  // 这样运算可防止溢出
  const middle = left + Math.floor((right - left) / 2);
  return process(arr, left, middle) + process(arr, middle + 1, right) + merge(arr, left, middle, right);
}

function merge(arr: number[], left: number, middle: number, right: number): number {
  let sum = 0;
  const helper: number[] = [];
  let p1 = left;
  let p2 = middle + 1;

  while (p1 <= middle && p2 <= right) {
    if (arr[p1] <= arr[p2]) {
      helper.push(arr[p1]);
      // 右边有多少个数大于 arr[p1]
      const rightBigCount = right - p2 + 1;
      sum += arr[p1] * rightBigCount;
      p1++;
      continue;
    }

    helper.push(arr[p2]);
    p2++;
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

  return sum;

}

function main() {
  console.log('sumOfSmall: ', sumOfSmall([1, 3, 4, 2, 5]));
}

main();