import '@/idle-scheduler/easy';
import { idleRunner } from '@/idle-scheduler/idle-runner';
import { IdleScheduler } from '@/idle-scheduler/idle-scheduler';
import { SequentalIterator } from '@/idle-scheduler/iterator';
import { NonBlockingRunner } from '@/idle-scheduler/non-blocking-runner';
import { createNums } from '@/idle-scheduler/utils';

function calculateUnit(val: number, max: number) {
  return Math.max(val, max);
}

// 10,000,000
const count = Math.pow(10, 7);
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

  performance.mark('calculate:start');
  return nonBlockingRunner
    .reduce((index: number, acc: number) => {
      return calculateUnit(index + 1, acc);
    }, 0)
    .then((max) => {
      performance.mark('calculate:end');
      console.log('cost is', performance.measure('duration', 'calculate:start', 'calculate:end'));
      return max;
    });
}
