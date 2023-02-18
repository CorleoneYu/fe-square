import { createNums } from '@/idle-scheduler/utils';

interface ITask {
  (recordId: number): number;
}

interface ITerator<T = number> {
  index: number;
  next(): T;
  isEmpty(): boolean;
}

let sum = 0;
const count = Math.pow(10, 7);
const nums = createNums(count);

export function asyncTask(step: number) {
  const iterator = createIterator(nums);

  runner(
    iterator,
    (recordId: number) => {
      sum += recordId;
      return sum;
    },
    step,
  );
}

/**
 * 创建迭代器
 * @param recordIds
 * @returns
 */
function createIterator(recordIds: number[]) {
  const iterator: ITerator = {
    index: 0,
    next() {
      return recordIds[this.index++];
    },
    isEmpty() {
      return this.index === recordIds.length;
    },
  };
  return iterator;
}

function runner(iterator: ITerator, task: ITask, step: number) {
  const prevTime = performance.now();
  do {
    for (let i = 0; i < step; i++) {
      if (iterator.isEmpty()) {
        console.log('runner result', sum);
        return sum;
      }

      const recordId = iterator.next();
      sum = task(recordId);
    }
  } while (performance.now() - prevTime < 15);

  // 微任务
  setTimeout(() => {
    runner(iterator, task, step);
  }, 0);
}

(window as any).run = asyncTask;
