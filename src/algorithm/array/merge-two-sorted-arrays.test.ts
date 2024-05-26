import { swap } from '@/algorithm/utils';

/**
  题目：原地合并两个有序数组
  link https://leetcode.cn/problems/merge-sorted-array/submissions/
  思路：nums2 跟 nums1 由后往前
  - 比较谁大就用谁
  - 如果用 nums1 上的数的话，需要交换
 */
export function mergeSorted(nums1: number[], m: number, nums2: number[], n: number): void {
  let p1 = m - 1;
  let p2 = n - 1;
  let last = n + m - 1;

  while (p2 >= 0) {
    if (p1 < 0 || nums1[p1] <= nums2[p2]) {
      nums1[last--] = nums2[p2--];
    } else {
      swap(nums1, last--, p1--);
    }
  }
}

it('merge two sorted arrays', () => {
  const nums1 = [1, 2, 3, 0, 0, 0];
  const nums2 = [2, 5, 6];
  mergeSorted(nums1, 3, nums2, 3);
  expect(nums1).toEqual([1, 2, 2, 3, 5, 6]);
});
