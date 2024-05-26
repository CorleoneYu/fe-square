/**
 * 最长公共前缀 m 个字符串，字符串长度为 n
 * 暴力求解
 * 时间复杂度 O(n*m)
 */
export function longestCommonPrefix(strs: string[]): string {
  if (strs.length === 0) {
    return '';
  }
  if (strs.length === 1) {
    return strs[0];
  }

  const first = strs[0];
  for (let i = 0; i < first.length; i++) {
    const char = first[i];
    for (let j = 1; j < strs.length; j++) {
      if (strs[j][i] === undefined || strs[j][i] !== char) {
        // 如果不满足条件，则返回结果
        return first.slice(0, i);
      }
    }
  }
  return first;
}
