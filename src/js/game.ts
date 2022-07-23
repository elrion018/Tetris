import { Board } from './board';
import { Calculator } from './calculator';
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
  requestId: number;

  constructor({ target }: Props) {
    this.user = new User();
    this.board = new Board({ target });
    this.calculator = new Calculator({ user: this.user });
    this.view = new View({ target });
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

    if (this.user.updateUserInfo(calculatedUserInfo))
      this.view.render(this.user.getUserInfo());

    this.requestId = requestAnimationFrame(this.keep);
  }
}
