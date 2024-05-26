/**
 * 三数之和
 * link: https://leetcode.cn/problems/3sum/solution/san-shu-zhi-he-by-leetcode-solution/
 * 思路：
 * 1. 排序：为了不重复
 * 2. 双指针：在数组中找到两数之和为特定值
 */
export function threeSum(nums: number[]): number[][] {
  if (nums.length < 3) {
    return [];
  }

  nums = nums.sort((a, b) => a - b);
  const result: number[][] = [];
  for (let first = 0; first < nums.length; first++) {
    // 需要和上次枚举时不一致
    if (first > 0 && nums[first] === nums[first - 1]) {
      continue;
    }

    // 右指针
    let third = nums.length - 1;
    // 求和为 -first
    let target = -nums[first];
    for (let second = first + 1; second < nums.length; second++) {
      if (second > first + 1 && nums[second] === nums[second - 1]) {
        continue;
      }

      // 需要保证 second 的指针在 third 的指针的左侧
      while (second < third && nums[second] + nums[third] > target) {
        third--;
      }

      // 如果指针重合
      if (second === third) {
        break;
      }

      if (nums[second] + nums[third] === target) {
        result.push([nums[first], nums[second], nums[third]]);
      }
    }
  }

  return result;
}

/**
 * 解码总数
 * 思路：动态规划
 * link: https://leetcode.cn/problems/decode-ways/solution/
 * https://leetcode.cn/problems/decode-ways/solution/gong-shui-san-xie-gen-ju-shu-ju-fan-wei-ug3dd/
 */
export function numDecodings(text: string): number {
  const count = text.length;
  const counts: number[] = new Array(count + 1).fill(0);
  counts[0] = 1;

  for (let i = 1; i <= count; i++) {
    if (counts[i - 1] !== 0) {
      counts[i] += counts[i - 1];
    }
    if (i > 1 && text[i - 2] !== '0' && Number(`${text[i - 2]}${text[i - 1]}`) <= 26) {
      counts[i] += counts[i - 2];
    }
  }
  return counts[count];
}

it('numDecodings', () => {
  expect(numDecodings('12')).toBe(2);
});

/**
 * link https://leetcode.cn/problems/gu-piao-de-zui-da-li-run-lcof/solution/
 * 股票问题
 * @param prices
 */
export function maxProfit(prices: number[]): number {
  // 花费
  let cost = Number.MAX_SAFE_INTEGER;
  // 利润
  let profit = 0;
  for (let i = 0; i < prices.length; i++) {
    const price = prices[i];
    cost = Math.min(cost, price);
    profit = Math.max(profit, price - cost);
  }
  return profit;
}
