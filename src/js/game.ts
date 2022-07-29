import { Board } from './Board';
import { Calculator } from './Calculator';
import { Timer } from './Timer';
import { User } from './User';
import { UserInterface } from './UserInterface';

import { ONE, PIECE_STATUS, TIME_FOR_DROP_BY_LEVEL, ZERO } from './constants';

interface Props {
  target: HTMLElement;
}

export class Game {
  user: User;
  board: Board;
  calculator: Calculator;
  useInterface: UserInterface;
  timer: Timer;
  requestId: number;

  constructor({ target }: Props) {
    this.user = new User();
    this.board = new Board({ target, user: this.user });
    this.calculator = new Calculator({ user: this.user });
    this.useInterface = new UserInterface({ target, board: this.board });
    this.timer = new Timer();
    this.requestId = 0;

    this.start();
  }

  start() {
    this.timer.start();
    this.useInterface.attachKeyboardEvent();

    this.requestId = requestAnimationFrame(this.keep.bind(this));
  }

  reset() {
    this.board.reset();
    this.user.reset();
  }

  keep() {
    this.board.cleanBoard();
    this.movePiece();
    this.board.drawPieces();
    this.clearLines();
    this.useInterface.render(this.user.getUserInfo());

    this.requestId = requestAnimationFrame(this.keep.bind(this));
  }

  movePiece() {
    const elaspedTime = this.timer.getElapsedTime();
    const { level } = this.user.getUserInfo();

    if (elaspedTime >= TIME_FOR_DROP_BY_LEVEL[level]) {
      this.board.movePiece(ZERO, ONE);
      this.timer.updateBorderTime();
    }
  }

  clearLines() {
    const lines = this.board.getClearedLines();
    const calculatedUserInfo =
      this.calculator.getCalculatedUserInfoWithLines(lines);

    this.user.setUserInfo(calculatedUserInfo);
  }

  over() {
    cancelAnimationFrame(this.requestId);

    this.board.writeGameOverText();
  }
}
