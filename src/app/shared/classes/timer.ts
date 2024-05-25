export class Timer {
  private _ms: number;
  private _callback: () => void;

  private _timeoutId?: ReturnType<typeof setTimeout>;
  private _isStopped = true;

  private _timerStart: number;
  private _timerNextIn: number;

  constructor(callback: () => void, ms?: number) {
    this._callback = callback;
    this._ms = ms && ms > 0 ? ms : 1;

    this._timerStart = new Date().getTime();
    this._timerNextIn = this._ms;

    this._setRecursiveTimeout();
  }

  stop() {
    if (!this._isStopped) {
      this._clearTimeout();

      const timerStop = new Date().getTime();
      const timePassed = timerStop - this._timerStart;
      this._timerNextIn -= timePassed;

      this._isStopped = true;
    }
  }

  resume() {
    if (this._isStopped) {
      this._timerStart = new Date().getTime();
      this._setRecursiveTimeout();
    }
  }

  reset() {
    this._clearTimeout();
    this._timerNextIn = this._ms;

    if (!this._isStopped) {
      this._setRecursiveTimeout();
    }
  }

  destroy() {
    this._clearTimeout();
    this._isStopped = true;
  }

  private _clearTimeout() {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
      this._timeoutId = undefined;
    }
  }

  private _setRecursiveTimeout() {
    this._isStopped = false;

    // to make sure we don't set multiple timeouts at once
    this._clearTimeout();

    this._timeoutId = setTimeout(() => {
      this._callback();

      this._timerStart = new Date().getTime();
      this._timerNextIn = this._ms;

      this._setRecursiveTimeout();
    }, this._timerNextIn);
  }
}
