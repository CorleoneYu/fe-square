/**
 * links https://leetcode.cn/problems/merge-intervals/submissions/
 * 合并区间
 * 思路：
 * 1. 先排序
 * 2. 遍历，对区间右侧做延伸
 * 时间复杂度 O(N*logN) 空间复杂度 logN
 * @param intervals
 * @returns
 */
export function merge(intervals: number[][]): number[][] {
  if (intervals.length === 0) {
    return [];
  }

  const sorted = intervals.sort((value, other) => value[0] - other[0]);
  const result: number[][] = [sorted[0]];
  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    const last = result[result.length - 1];
    if (current[0] > last[1]) {
      // 没有相交
      result.push(current);
      continue;
    }

    // 相交，延伸
    last[1] = Math.max(current[1], last[1]);
  }
  return result;
}
