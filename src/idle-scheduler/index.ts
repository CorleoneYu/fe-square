import { idleRunner } from '@/idle-scheduler/idle-runner';
import { IdleScheduler } from '@/idle-scheduler/idle-scheduler';
import { SequentalIterator } from '@/idle-scheduler/iterator';
import { NonBlockingRunner } from '@/idle-scheduler/non-blocking-runner';

function createNums(count: number) {
  const nums: number[] = [];
  for (let i = 1; i <= count; i++) {
    nums.push(i);
  }
  return nums;
}

function calculateUnit(val: number, max: number) {
  return Math.max(val, max);
}

const count = 100000000;
const nums = createNums(count);

export function syncExecute() {
  const start = performance.now();
  let max = 0;
  nums.forEach((num) => {
    max = calculateUnit(num, max);
  });
  const end = performance.now();
  console.log('cost is', `${end - start}ms`, max);
  return max;
}

export async function asyncExecute() {
  const idleScheduler = new IdleScheduler(idleRunner);
  const sequentialIterator = new SequentalIterator(count);
  const nonBlockingRunner = new NonBlockingRunner<number, number>(sequentialIterator, idleScheduler);
  const start = performance.now();
  return nonBlockingRunner
    .reduce((index: number, acc: number) => {
      return calculateUnit(index + 1, acc);
    }, 0)
    .then((max) => {
      const end = performance.now();
      console.log('cost is', `${end - start}ms`, max);
      return max;
    });
}
