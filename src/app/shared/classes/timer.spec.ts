import { Timer } from './timer';

describe('Timer', () => {
  let timer: Timer;
  let callbackSpy: jasmine.Spy;

  beforeEach(() => {
    callbackSpy = jasmine.createSpy('callback');
    timer = new Timer(callbackSpy, 50);
  });

  afterEach(() => {
    timer.destroy();
  });

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  it('should initialize and start the timer', async () => {
    expect(callbackSpy).not.toHaveBeenCalled();

    await delay(60);

    expect(callbackSpy).toHaveBeenCalledTimes(1);
  });

  it('should stop the timer', async () => {
    expect(callbackSpy).not.toHaveBeenCalled();

    timer.stop();
    await delay(60);

    expect(callbackSpy).not.toHaveBeenCalled();
  });

  it('should resume the timer', async () => {
    expect(callbackSpy).not.toHaveBeenCalled();

    timer.stop();
    await delay(10);

    timer.resume();
    await delay(50);

    expect(callbackSpy).toHaveBeenCalledTimes(1);
  });

  it('should call callback() in the right time after stopping and resuming timer more than once', async () => {
    expect(callbackSpy).not.toHaveBeenCalled();

    timer.stop(); //passed 0ms
    await delay(20);

    timer.resume();
    expect(callbackSpy).not.toHaveBeenCalled();
    await delay(20);

    timer.stop(); // passed 20ms
    expect(callbackSpy).not.toHaveBeenCalled();
    await delay(20);

    timer.resume();
    expect(callbackSpy).not.toHaveBeenCalled();
    await delay(40);

    expect(callbackSpy).toHaveBeenCalledTimes(1); // passed 60ms, should have been called 10 ms ago
  });

  it('should destroy the timer', async () => {
    expect(callbackSpy).not.toHaveBeenCalled();

    timer.destroy();
    await delay(60);

    expect(callbackSpy).not.toHaveBeenCalled();
  });
});
