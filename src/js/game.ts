import { Board } from './Board';
import { Calculator } from './Calculator';
import { Timer } from './Timer';
import { User } from './User';
import { View } from './View';

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
  private target: HTMLElement;
  private user: User;
  private board: Board;
  private useInterface: View;
  private timer: Timer;
  private gameId: number;

  constructor({ target }: Props) {
    this.target = target;
    this.user = new User();
    this.board = new Board({ target, user: this.user });
    this.useInterface = new View({ target, game: this });
    this.timer = new Timer();
    this.gameId = 0;
  }

  private keep() {
    this.board.cleanBoard();
    this.movePieceByTime();
    this.board.drawStackedPiece();

    if (Checker.checkGameOver({ board: this.board })) return this.over();

    this.board.drawCurrentPiece();
    this.clearLines();
    this.levelUp();
    this.useInterface.render(this.user.getUserInfo());

    this.gameId = requestAnimationFrame(this.keep.bind(this));
  }

  private clearLines() {
    const lines = this.board.getClearedLines();

    if (!lines) return;

    this.user.addLines(lines);

    this.user.addScore(Calculator.calculateScoreByLine({ lines }));
  }

  private levelUp() {
    const { score, level } = this.user.getUserInfo();

    if (score >= SCORE_FOR_LEVEL_UP * level) this.user.levelUp();
  }

  private over() {
    cancelAnimationFrame(this.gameId);
    this.board.writeGameOverText();
  }

  getGameId() {
    return this.gameId;
  }

  start() {
    this.gameId = requestAnimationFrame(this.keep.bind(this));

    this.timer.start();
  }

  reset() {
    this.user = new User();
    this.board = new Board({ target: this.target, user: this.user });
    this.timer = new Timer();
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
}
