interface TimeInfo {
  startTime: number;
  elapsedTime: number;
  endTime: number;
}

const initialTimeInfo = {
  startTime: 0,
  elapsedTime: 0,
  endTime: 0,
};

export class Timer {
  timeInfo: TimeInfo;

  constructor() {
    this.timeInfo = initialTimeInfo;
  }
}
