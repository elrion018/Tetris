import { Board } from './Board';
import { Calculator } from './Calculator';
import { Timer } from './Timer';
import { User } from './User';
import { UserInterface } from './UserInterface';

import {
  MAX_LEVEL,
  ONE,
  SCORES,
  TIME_FOR_MOVE_DOWN_BY_LEVEL,
  ZERO,
} from './constants';
import { Checker } from './Checker';

const { SCORE_FOR_LEVEL_UP } = SCORES;

interface Props {
  target: HTMLElement;
}

export class Game {
  user: User;
  board: Board;
  useInterface: UserInterface;
  timer: Timer;
  requestId: number;

  constructor({ target }: Props) {
    this.user = new User();
    this.board = new Board({ target, user: this.user });
    this.useInterface = new UserInterface({ target, game: this });
    this.timer = new Timer();
    this.requestId = 0;

    this.start();
  }

  start() {
    this.timer.start();
    this.useInterface.attachEventHandlers();

    this.requestId = requestAnimationFrame(this.keep.bind(this));
  }

  reset() {
    this.board.reset();
    this.user.reset();
  }

  keep() {
    this.board.cleanBoard();
    this.movePieceByTime();
    this.board.drawStackedPiece();

    if (Checker.checkGameOver({ board: this.board })) return this.over();

    this.board.drawCurrentPiece();
    this.clearLines();
    this.levelUp();
    this.useInterface.render(this.user.getUserInfo());

    this.requestId = requestAnimationFrame(this.keep.bind(this));
  }

  movePieceByTime() {
    const elaspedTime = this.timer.getElapsedTime();
    const { level } = this.user.getUserInfo();

    if (
      elaspedTime >=
      TIME_FOR_MOVE_DOWN_BY_LEVEL[level > MAX_LEVEL ? MAX_LEVEL : level]
    ) {
      this.board.movePiece(ZERO, ONE);
      this.timer.updateBorderTime();
    }
  }

  movePieceByKey(changeX: number, changeY: number) {
    this.board.movePiece(changeX, changeY);
  }

  rotatePiece() {
    this.board.rotatePiece();
  }

  dropPiece() {
    this.board.dropPiece();
  }

  clearLines() {
    const lines = this.board.getClearedLines();

    if (!lines) return;

    this.user.addLines(lines);

    this.user.addScore(Calculator.calculateScoreByLine({ lines }));
  }

  levelUp() {
    const { score, level } = this.user.getUserInfo();

    if (score >= SCORE_FOR_LEVEL_UP * level) this.user.levelUp();
  }

  over() {
    cancelAnimationFrame(this.requestId);
    this.board.writeGameOverText();
  }
}
