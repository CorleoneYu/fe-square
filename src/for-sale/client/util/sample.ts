export function sample<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// 数组乱序
const shuffle = <T>(array: T[]): T[] => {
  const result = [...array];
  for (let i = result.length; i; i--) {
    const random = Math.floor(Math.random() * i);
    const temp = result[i - 1];
    result[i - 1] = result[random];
    result[random] = temp;
  }
  return result;
};

export const sampleMultiple = <T>(array: T[], count?: number): T[] => {
  const shuffledArray = shuffle(array);
  const randomCount = count ?? Math.max(1, Math.floor(Math.random() * array.length));
  const result = shuffledArray.slice(array.length - randomCount);
  return result;
};
