import { ONE_HUNDRED_MS } from './constants';

export class Timer {
  private step: number;
  private progress: number;
  private timerId: ReturnType<typeof setTimeout> | null;

  constructor() {
    this.step = 0;
    this.progress = 0;
    this.timerId = null;
  }

  private tick() {
    return setTimeout(
      (() => {
        this.progress += ONE_HUNDRED_MS;

        this.timerId = this.tick();
      }).bind(this),
      ONE_HUNDRED_MS
    );
  }

  start() {
    this.timerId = this.tick();
  }

  getElapsedTime() {
    return this.progress - this.step;
  }

  updateStep() {
    this.step = this.progress;
  }
}
