/**
  Do not return anything, modify nums1 in-place instead.
  link https://leetcode.cn/problems/merge-sorted-array/submissions/
 */
export function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  let len1 = m - 1;
  let len2 = n - 1;
  let len = m + n - 1;

  while (len2 >= 0) {
    if (len1 < 0) {
      nums1[len--] = nums2[len2--];
      continue;
    }

    nums1[len--] = nums1[len1] >= nums2[len2] ? nums1[len1--] : nums2[len2--];
  }
};

function main() {
  const nums1 = [1, 2, 3, 0, 0, 0];
  const nums2 = [2, 5, 6];
  merge(nums1, 3, nums2, 3);
  console.log('nums1', nums1);
}

main();