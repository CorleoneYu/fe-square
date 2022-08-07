import { IIdleScheduler, ITask, TaskState } from '@/idle-scheduler/idle-scheduler';
import { IIterator } from '@/idle-scheduler/iterator';

type ReduceCallback<T, ReturnValue> = (currentValue: T, accumulator: ReturnValue) => ReturnValue;

const AbortReason = 'abort';

export class NonBlockingRunner<TReturnValue, TCurrentValue> {
  private task: ITask | null = null;

  public constructor(private iterator: IIterator<TCurrentValue>, private scheduler: IIdleScheduler) {}

  public abort(): void {
    if (!this.task) {
      return;
    }

    this.scheduler.remove(this.task);
    this.task.reject(new Error(AbortReason));
    this.task = null;
  }

  public reduce(callback: ReduceCallback<TCurrentValue, TReturnValue>, accumulator: TReturnValue) {
    return this.loop(callback, accumulator);
  }

  private next() {
    return this.iterator.next();
  }

  private loop(callback: Function, accumulator?: any): Promise<TReturnValue | undefined> {
    return new Promise((resolve, reject) => {
      const task: ITask = {
        run: (): TaskState => {
          const runnerValue = this.next();
          if (runnerValue !== null) {
            // reduce 需要重新赋值 accumulator
            accumulator = callback(runnerValue, accumulator);
            return TaskState.RUNNING;
          }

          // 没有下一个迭代值，说明执行完成
          this.task = null;
          resolve(accumulator);
          return TaskState.FINISHED;
        },
        reject,
      };
      this.task = task;
      this.scheduler.add(task);
    });
  }
}
