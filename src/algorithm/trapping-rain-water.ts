/**
 * link https://leetcode.cn/problems/trapping-rain-water/
 * 按列求
 * 时间复杂度 O(n * n)
 * 空间复杂度 O(n)
 */
export function trap1(heights: number[]): number {
  const result = heights.reduce((acc, height, index) => {
    return acc + trapColumn(height, index, heights);
  }, 0);
  return result;

  function trapColumn(height: number, index: number, heights: number[]): number {
    // 求每一列的水，我们只需要关注当前列，以及左边最高的墙，右边最高的墙就够了。
    const leftMax = getMax(0, index - 1, heights);
    const rightMax = getMax(index + 1, heights.length - 1, heights);
    const min = Math.min(leftMax, rightMax);

    if (min <= height) {
      return 0;
    }

    // 较矮的墙的高度大于当前列的墙的高度，可以存 min - height 的水
    const result = min - height;
    console.log('trapColumn: ', result, index);
    return result;
  }

  /**
   * 时间复杂度 O(n)
   * @param start 
   * @param end 
   * @param heights 
   */
  function getMax(start: number, end: number, heights: number[]): number {
    let max = heights[start];
    for (let i = start + 1; i <= end; i++) {
      max = Math.max(heights[i], max);
    }
    return max ?? 0;
  }
};

/**
 * 优化 getMax 从 O(n) -> O(1)
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
export function trap2(heights: number[]) {
  if (heights.length <= 2) {
    return 0;
  }

  const leftMaxHeights = [heights[0]];
  // 只需要求 1 至 heights.length - 2，前后两列不可能有水
  for (let i = 1; i < heights.length - 1; i++) {
    leftMaxHeights[i] = Math.max(leftMaxHeights[i - 1], heights[i - 1]);
  }
  console.log('leftMaxHeights', leftMaxHeights);

  const rightMaxHeights: number[] = [];
  rightMaxHeights[heights.length - 1] = heights[heights.length - 1];
  for (let i = heights.length - 2; i >= 1; i--) {
    rightMaxHeights[i] = Math.max(rightMaxHeights[i + 1], heights[i + 1]);
  }
  console.log('rightMaxHeights', rightMaxHeights);

  let result = 0;
  for (let i = 1; i < heights.length - 1; i++) {
    const min = Math.min(leftMaxHeights[i], rightMaxHeights[i]);
    if (min <= heights[i]) {
      continue;
    }

    result += min - heights[i];
  }
  return result;
}

/**
 * 单调栈
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
export function trap3(heights: number[]) {
  if (heights.length <= 2) {
    return 0;
  }

  let result = 0;
  const stack = [{ height: heights[0], index: 0 }];
  for (let i = 1; i <= heights.length - 1; i++) {
    while (stack.length !== 0 && stack[stack.length - 1].height < heights[i]) {
      // 栈顶元素小于当前元素，计算存水量
      const top = stack.pop()!;
      while (stack.length !== 0 && stack[stack.length - 1].height === top.height) {
        // 与栈顶元素一样，直接出栈
        stack.pop();
      }

      const newTop = stack[stack.length - 1];
      if (newTop) {
        const minHeight = Math.min(heights[i], newTop.height);
        const delta = minHeight - top.height;
        const count = i - newTop.index - 1;
        result += delta * count;
      }
    }

    stack.push({
      height: heights[i],
      index: i,
    });
  }
  return result;
}

function main() {
  console.log(trap3([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));
  console.log(trap3([4, 2, 0, 3, 2, 5]));
  console.log(trap3([4, 3, 2, 0, 1, 1, 5]));
}

main();
