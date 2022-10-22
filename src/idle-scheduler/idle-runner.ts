export interface IIdleRunner {
  registerIdleCallback: (callback: Function) => void;
  unRegisterIdleCallback: (callback: Function) => void;
  getCurrentTime: () => number;
}

/**
 * 注册 cb
 * 判断是否空闲，执行 cb
 */
export class IdleRunner implements IIdleRunner {
  private static readonly initialId = 0;

  private idleCallbacks: Function[] = [];
  private timerId = IdleRunner.initialId;
  private idleStartTime = 0;
  private isRunning = false;
  private threshold = 200;

  public registerIdleCallback(callback: Function): void {
    this.idleCallbacks.push(callback);
    this.start();
  }

  public unRegisterIdleCallback(callback: Function): void {
    const callbackIndex = this.idleCallbacks.indexOf(callback);
    if (callbackIndex === -1) {
      return;
    }

    this.idleCallbacks.splice(callbackIndex, 1);
    if (this.idleCallbacks.length === 0) {
      this.stop();
    }
  }

  public getCurrentTime(): number {
    return performance.now();
  }

  private checkIdle(): boolean {
    const currentTime = this.getCurrentTime();
    if (this.idleStartTime === 0) {
      // 初始化
      this.idleStartTime = currentTime;
      return true;
    }

    // 判断当前时间是否达到阈值，即是否可以继续执行
    const isIdle = currentTime - this.idleStartTime < this.threshold;
    this.idleStartTime = currentTime;
    return isIdle;
  }

  /**
   * 处理 idle callback，并设置执行状态
   */
  private handleIdleCallback() {
    if (this.idleCallbacks.length === 0) {
      this.isRunning = false;
      return;
    }

    this.isRunning = true;
    const idleCallback = this.idleCallbacks.shift()!;
    // 执行
    idleCallback();

    if (this.idleCallbacks.length !== 0) {
      this.nextTick(this.handle.bind(this));
      return;
    }
    this.isRunning = false;
  }

  private handle(): void {
    this.timerId = IdleRunner.initialId;
    this.isRunning = false;
    return this.checkIdle() ? this.handleIdleCallback() : this.start();
  }

  private start(): void {
    // 已经在执行时，不需要再触发下一次执行
    if (this.isRunning) {
      return;
    }

    // TODO: ?
    if (this.timerId !== IdleRunner.initialId) {
      return;
    }

    this.timerId = this.setTimer(this.handle.bind(this));
  }

  private stop() {
    // 说明没有 start 过或已经 stop 了
    if (this.timerId === IdleRunner.initialId) {
      return;
    }

    this.cancelTimer(this.timerId);
    this.timerId = IdleRunner.initialId;
  }

  private setTimer(callback: Function): number {
    // TODO 为什么是 20
    return setTimeout(callback, 20);
  }

  private cancelTimer(timerId: number): void {
    return clearTimeout(timerId);
  }

  private nextTick(callback: Function): void {
    setTimeout(callback, 0);
  }
}

export const idleRunner = new IdleRunner();
