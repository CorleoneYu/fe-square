/**
 * link https://leetcode.com/problems/longest-substring-without-repeating-characters/
 */
export function lengthOfLongestSubstring(text: string): number {
  if (text.length === 0) {
    return 0;
  }

  const charMap = new Map<string, boolean>();
  let max = 0;
  let left = 0;
  let right = -1;

  while (left < text.length) {
    if (right + 1 < text.length && !charMap.has(text[right + 1])) {
      // charMap 包含下一个字符， right 向右移动
      charMap.set(text[right + 1], true);
      right += 1;
    } else {
      // left 向右移动
      charMap.delete(text[left]);
      left += 1;
    }
    max = Math.max(max, right - left + 1);
  }

  return max;
}

function main() {
  console.log('"abcabcbb": ', lengthOfLongestSubstring("abcabcbb"));
  console.log('"bbbbb": ', lengthOfLongestSubstring("bbbbb"));
  console.log('"pwwkew": ', lengthOfLongestSubstring("pwwkew"));
}

main();