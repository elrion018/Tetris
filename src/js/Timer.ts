import { SECOND_BY_MS } from './constants';

export class Timer {
  borderTime: number;
  progress: number;
  timerId: ReturnType<typeof setTimeout> | null;

  constructor() {
    this.borderTime = 0;
    this.progress = 0;
    this.timerId = null;
  }

  start() {
    this.timerId = this.tick();
  }

  getElapsedTime() {
    return this.progress - this.borderTime;
  }

  updateBorderTime() {
    this.borderTime = this.progress;
  }

  setborderTime(newBorderTime: number) {
    this.borderTime = newBorderTime;
  }

  tick() {
    return setTimeout(
      (() => {
        this.progress += SECOND_BY_MS;

        this.timerId = this.tick();
      }).bind(this),
      SECOND_BY_MS
    );
  }

  clear() {
    if (!this.timerId) return;

    clearTimeout(this.timerId);

    this.timerId = null;
  }
}
