export function swap(numbers: number[], i: number, j: number) {
  const temp = numbers[i];
  numbers[i] = numbers[j];
  numbers[j] = temp;
}
