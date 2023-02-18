// p8 找到所有数组中消失的数字
// 要求：不使用额外空间，时间复杂度 O(n)
// 思路：使用原数组来标志
// 第一次遍历中，遍历到第 0 个元素为 2 时，对第（2-1）个元素取负绝对值，
// 第二次遍历中，检查哪些元素大于 0，通过换算找到哪些值没有出现过
export function findDisappearedNumbers(nums: number[]): number[] {
  for (let i = 0; i < nums.length; i++) {
    const targetIndex = Math.abs(nums[i]) - 1;
    nums[targetIndex] = -Math.abs(nums[targetIndex]);
  }

  const ret: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < 0) {
      continue;
    }

    // 找到对应值
    const targetIndex = i + 1;
    ret.push(targetIndex);
  }
  return ret;

  // 暴力解决，hash map 思路 空间复杂度、时间复杂度都为 O(n)
  // const max = nums.length;
  // if (max === 0) {
  //   return [];
  // }

  // const map: Map<number, true> = new Map();
  // nums.forEach((num) => {
  //   map.set(num, true);
  // });

  // const ret: number[] = [];
  // for (let i = 1; i <= max; i++) {
  //   if (map.get(i)) {
  //     continue;
  //   }
  //   ret.push(i);
  // }
  // return ret;
}

it('find disappeared numbers', () => {
  expect(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1])).toEqual([5, 6]);
  expect(findDisappearedNumbers([1, 1])).toEqual([2]);
});
