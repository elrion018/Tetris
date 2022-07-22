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

  animate() {
    this.board.cleanBoard();

    this.requestId = requestAnimationFrame(this.animate);
  }
}
