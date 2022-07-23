import { Board } from './Board';
import { Calculator } from './Calculator';
import { Timer } from './Timer';
import { User } from './User';
import { View } from './View';

interface Props {
  target: HTMLElement;
}

export class Game {
  user: User;
  board: Board;
  calculator: Calculator;
  view: View;
  timer: Timer;
  requestId: number;

  constructor({ target }: Props) {
    this.user = new User();
    this.board = new Board({ target });
    this.calculator = new Calculator({ user: this.user });
    this.view = new View({ target });
    this.timer = new Timer();
    this.requestId = 0;

    this.start();
  }

  start() {
    this.requestId = requestAnimationFrame(this.keep.bind(this));
  }

  reset() {
    this.board.reset();
    this.user.reset();
  }

  keep() {
    this.board.cleanBoard();
    this.board.dropPiece();
    this.board.drawPieces();

    const lines = this.board.getClearedLines();
    const calculatedUserInfo =
      this.calculator.getCalculatedUserInfoWithLines(lines);

    if (this.user.updateUserInfo(calculatedUserInfo))
      this.view.render(this.user.getUserInfo());

    this.requestId = requestAnimationFrame(this.keep.bind(this));
  }

  over() {
    cancelAnimationFrame(this.requestId);

    this.board.writeGameOverText();
  }
}
