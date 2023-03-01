/**
 * link https://leetcode.com/problems/longest-substring-without-repeating-characters/
 * 最长不含重复字符的子字符串
 * 思路：left right 指针，遍历，维护 max
 */
// function lengthOfLongestSubstring(text: string): number {
//   if (text.length === 0) {
//     return 0;
//   }

//   const charMap = new Map<string, boolean>();
//   let max = 0;
//   let left = 0;
//   let right = -1;

//   while (left < text.length) {
//     if (right + 1 < text.length && !charMap.has(text[right + 1])) {
//       // charMap 包含下一个字符， right 向右移动
//       charMap.set(text[right + 1], true);
//       right += 1;
//     } else {
//       // left 向右移动
//       charMap.delete(text[left]);
//       left += 1;
//     }
//     max = Math.max(max, right - left + 1);
//   }

//   return max;
// }

describe('longest sub-string', () => {
  it('test1', () => {
    expect(lengthOfLongestSubstring('abcabcbb')).toBe(3);
    expect(lengthOfLongestSubstring('bbbbb')).toBe(1);
    expect(lengthOfLongestSubstring('pwwkew')).toBe(3);
  });
});

export function lengthOfLongestSubstring(text: string) {
  if (text.length === 0 || text.length === 1) return text.length;

  const set = new Set();
  let left = 0;
  let right = 0;
  let max = 0;
  while (right < text.length) {
    if (!set.has(text[right])) {
      set.add(text[right]);
      right++;
    } else {
      set.delete(text[left]);
      left++;
    }
    max = Math.max(right - left, max);
  }
  return max;
}
