function main() {
  const arr = [3, 5, 6, 3, 4, 5, 2, 6, 9, 0];
  quickSort(arr);
  console.log('sorted', arr);
}

main();

/**
 * 快排
 * 时间复杂度：N * logN
 * 空间复杂度 logN 最差 N
 * link p4 https://www.bilibili.com/video/BV13g41157hK?p=4&vd_source=7e817e5170ca4a2b16683f214bdf65c5
 */
export function quickSort(arr: number[]) {
  if (arr.length < 2) {
    return arr;
  }

  sort(arr, 0, arr.length - 1);
}

function sort(arr: number[], left: number, right: number) {
  if (left >= right) {
    return;
  }

  const randomIndex = Math.floor(Math.random() * (right - left)) + left;
  swap(arr, randomIndex, right);
  const result = partition(arr, left, right);
  sort(arr, left, result.left - 1);
  sort(arr, result.right + 1, right);
}

function swap(arr: number[], p1: number, p2: number) {
  let temp = arr[p1];
  arr[p1] = arr[p2];
  arr[p2] = temp;
}

/**
 * 荷兰国旗问题
 * 处理 arr[left, ..., right] 范围
 * 取 arr[right] 为 p, 将数组做划分 <p、==p、>p 三个部分
 * 返回等与区域的左右边界
 * @param arr 
 * @param left 
 * @param right 
 */
function partition(arr: number[], left: number, right: number) {
  // 划分值
  const key = arr[right];
  // < 区域的右边界
  let less = left - 1;
  // > 区域的左边界
  let more = right;

  let index = left;
  while (index < more) {
    if (arr[index] < key) {
      // 当前数小于划分值
      swap(arr, less + 1, index);
      less++;
      index++;
      continue;
    }

    if (arr[index] === key) {
      index++;
      continue;
    }

    // arr[index] > key
    swap(arr, more - 1, index);
    more--;
  }

  swap(arr, more, right);

  return {
    left: less + 1,
    right: more,
  }
}