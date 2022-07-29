export class User {
  score: number;
  lines: number;
  level: number;

  constructor() {
    this.score = 0;
    this.lines = 0;
    this.level = 1;
  }

  reset() {
    this.score = 0;
    this.lines = 0;
    this.level = 1;
  }

  getUserInfo() {
    return { score: this.score, lines: this.lines, level: this.level };
  }

  addScore(score: number) {
    this.score += score;
  }

  addLines(lines: number) {
    this.lines += lines;
  }
}
