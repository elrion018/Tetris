import { Board } from './board';
import { Calculator } from './calculator';
import { User } from './User';

interface Props {
  context: CanvasRenderingContext2D;
}

export interface UserInfo {
  score: number;
  lines: number;
  level: number;
}

export class Game {
  user: User;
  board: Board;
  calculator: Calculator;
  requestId: number;

  constructor({ context }: Props) {
    this.user = new User();
    this.board = new Board({ context });
    this.calculator = new Calculator({ user: this.user });
    this.requestId = 0;
  }

  reset() {
    this.board.reset();
    this.user.reset();
  }

  keep() {
    this.board.cleanBoard();
    this.board.drawPieces();

    const lines = this.board.getClearedLines();
    const calculatedUserInfo =
      this.calculator.getCalculatedUserInfoWithLines(lines);

    this.requestId = requestAnimationFrame(this.keep);
  }
}
