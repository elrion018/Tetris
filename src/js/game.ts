import { Board } from './board';
import { Calculator } from './calculator';

interface Props {
  context: CanvasRenderingContext2D;
}

export interface UserInfo {
  score: number;
  lines: number;
  level: number;
}

export class Game {
  userInfo: UserInfo;
  board: Board;
  calculator: Calculator;
  requestId: number;

  constructor({ context }: Props) {
    this.userInfo = new Proxy({ score: 0, lines: 0, level: 1 }, {});
    this.board = new Board({ context });
    this.calculator = new Calculator({ userInfo: this.userInfo });
    this.requestId = 0;
  }

  reset() {
    this.board.reset();

    this.userInfo.score = 0;
    this.userInfo.level = 0;
    this.userInfo.lines = 0;
  }

  keep() {
    this.board.cleanBoard();
    this.board.drawPieces();

    const lines = this.board.getClearedLines();
    const calculatedUserInfo =
      this.calculator.getCalculatedUserInfoWithLines(lines);

    this.requestId = requestAnimationFrame(this.keep);
  }

  calculateUserInfoWithLines(lines: number): UserInfo | null {
    if (lines > 0) {
      const score = this.userInfo.level + 1;
      const level = this.userInfo.level;

      return { score, lines, level };
    }

    return null;
  }
}
