import { Board } from './board';

interface Props {
  context: CanvasRenderingContext2D;
}

export class Game {
  userInfo;
  board;
  requestId;

  constructor({ context }: Props) {
    this.userInfo = new Proxy({ score: 0, lines: 0, level: 0 }, {});
    this.board = new Board({ context });
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

    this.requestId = requestAnimationFrame(this.keep);
  }
}
