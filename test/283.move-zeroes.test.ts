// p7 移动零 https://www.bilibili.com/video/BV1nP411F7vW?p=7&vd_source=7e817e5170ca4a2b16683f214bdf65c5
// 思路：双指针，前后指针，先搬运非 0 元素，后补齐 0
export function moveZero(numbers: number[]) {
  if (numbers.length === 1) {
    return;
  }

  let left = 0;
  for (let right = 0; right < numbers.length; ++right) {
    if (numbers[right] === 0) {
      continue;
    }
    numbers[left++] = numbers[right];
  }

  // 非 0 元素搬运完了，剩下的就是 0
  for (let i = left; i < numbers.length; i++) {
    numbers[i] = 0;
  }
}

it('move zero', () => {
  const numbers = [0, 1, 0, 3, 12];
  moveZero(numbers);
  expect(numbers).toEqual([1, 3, 12, 0, 0]);
});
