import { swap } from '@/algorithm/utils';

/**
 * 快排
 * 时间复杂度：N * logN，最差,划分值很偏，好情况：划分值几乎中间
 * 空间复杂度 logN
 * link p4 https://www.bilibili.com/video/BV13g41157hK?p=4&vd_source=7e817e5170ca4a2b16683f214bdf65c5
 */
export function quickSort(arr: number[]) {
  if (arr.length < 2) {
    return arr;
  }

  sort(arr, 0, arr.length - 1);
}

function sort(arr: number[], left: number, right: number) {
  if (left >= right) {
    return;
  }

  // 随机选 index
  const randomIndex = Math.floor(Math.random() * (right - left)) + left;
  swap(arr, randomIndex, right);

  const result = partition(arr, left, right);

  sort(arr, left, result.left - 1);
  sort(arr, result.right + 1, right);
}

/**
 * 荷兰国旗问题
 * 处理 arr[left, ..., right] 范围
 * 取 arr[right] 为 p, 将数组做划分 <p、==p、>p 三个部分
 * 返回等与区域的左右边界
 * 思路：遍历，左<区，右 >区 双指针
 * 1. current < num, current 与 <区 下一个交换，左指针++，i++
 * 2. current === num, i++
 * 3. current > num, current 与 >区 上一个交换，右指针--, i 不动
 * @param arr
 * @param left
 * @param right
 */
function partition(arr: number[], left: number, right: number) {
  // 划分值
  const key = arr[right];
  // < 区域的右边界
  let less = left - 1;
  // > 区域的左边界
  let more = right;

  let index = left;
  while (index < more) {
    if (arr[index] < key) {
      // 当前数小于划分值
      swap(arr, less + 1, index);
      less++;
      index++;
      continue;
    }

    if (arr[index] === key) {
      index++;
      continue;
    }

    // arr[index] > key
    swap(arr, more - 1, index);
    more--;
  }

  // right 对应的值是划分值，交换丢到 more 指针下
  swap(arr, more, right);

  return {
    left: less + 1,
    right: more,
  };
}
