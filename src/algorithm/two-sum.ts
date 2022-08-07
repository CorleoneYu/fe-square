function main() {
  const nums = [2, 7, 11, 15];
  const sum = 9;
  console.log('two sum index:', twoSum(nums, sum));
}

/**
 * link https://leetcode.com/problems/two-sum/
 */
export function twoSum(nums: number[], sum: 9) {
  const map = new Map<number, number>();
  for (let index = 0; index < nums.length; index++) {
    const num = nums[index];
    const target = sum - num;
    const targetIndex = map.get(target);
    if (typeof targetIndex !== 'undefined') {
      return [targetIndex, index];
    }

    map.set(num, index);
  }
}

main();
