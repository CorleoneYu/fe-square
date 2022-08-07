import { IdleRunner } from '@/idle-scheduler/idle-runner';

/**
 * 按默认一帧的时间 16ms - 1ms 算
 */
const DEFAULT_RUNTIME = 15;

export const enum TaskState {
  RUNNING = 1,
  FINISHED = 2,
}

export interface ITask {
  context?: unknown;
  run: () => TaskState;
  reject: Function;
}

export interface IIdleScheduler {
  add: (task: ITask) => void;
  remove: (deleteTask: ITask) => void;
  removeAll(): void;
}

export class IdleScheduler implements IIdleScheduler {
  private tasks: ITask[] = [];
  private isRunning = false;
  private readonly runtime = DEFAULT_RUNTIME;

  public constructor(private readonly idleRunner: IdleRunner) {}

  public add(task: ITask): void {
    this.tasks.push(task);
    this.run();
  }

  public remove(deleteTask: ITask): void {
    this.tasks = this.tasks.filter((task) => task !== deleteTask);
    this.run();
  }

  public removeAll(): void {
    this.tasks = [];
    this.isRunning = false;
    this.idleRunner.unRegisterIdleCallback(this.idleCallback);
  }

  private run(): void {
    if (this.isRunning) {
      return;
    }

    if (this.tasks.length === 0) {
      this.isRunning = false;
      this.idleRunner.unRegisterIdleCallback(this.idleCallback);
      return;
    }

    this.isRunning = true;
    this.idleRunner.registerIdleCallback(this.idleCallback);
  }

  private idleCallback = () => {
    const currentTime = this.idleRunner.getCurrentTime();

    do {
      const task = this.tasks.shift();
      if (!task) {
        break;
      }

      // 执行
      const taskResult = task.run.call(task.context);

      // 如果没执行完，则继续回到任务队列
      if (taskResult !== TaskState.FINISHED) {
        this.tasks.push(task);
      }
    } while (this.idleRunner.getCurrentTime() - currentTime < this.runtime);

    this.isRunning = false;
    this.run();
  };
}
