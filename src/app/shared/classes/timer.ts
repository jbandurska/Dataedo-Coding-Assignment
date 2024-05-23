export class Timer {
  private ms!: number;
  private callback!: () => void;

  private timeoutIds: ReturnType<typeof setTimeout>[] = [];
  private lastTimeoutStart?: number;
  private remainingTime?: number;
  private isStopped = true;

  constructor(callback: () => void, ms?: number) {
    this.callback = callback;
    this.ms = ms && ms > 0 ? ms : 1;

    this.setRecursiveTimeout();
  }

  stop() {
    if (this.lastTimeoutStart) {
      this.clearTimeouts();
      const now = new Date().getTime();
      const shouldEnd = this.lastTimeoutStart + this.ms;
      this.remainingTime = shouldEnd - now;
      this.isStopped = true;
    }
  }

  resume() {
    if (this.remainingTime) {
      this.isStopped = false;

      const id = setTimeout(() => {
        this.lastTimeoutStart = new Date().getTime();
        this.callback();
        this.setRecursiveTimeout();
      }, this.remainingTime);

      this.timeoutIds.push(id);
    }
  }

  reset() {
    this.clearTimeouts();
    if (this.isStopped) {
      this.remainingTime = this.ms;
    } else {
      this.setRecursiveTimeout();
    }
  }

  destroy() {
    this.clearTimeouts();
  }

  private clearTimeouts() {
    this.timeoutIds.forEach((id) => clearTimeout(id));
    this.timeoutIds = [];
  }

  private setRecursiveTimeout() {
    this.isStopped = false;

    const id = setTimeout(() => {
      this.lastTimeoutStart = new Date().getTime();
      this.callback();
      this.setRecursiveTimeout();
    }, this.ms);

    this.timeoutIds.push(id);
  }
}
