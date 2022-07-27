import {
  ROWS,
  COLS,
  COLORS,
  BLOCK_SIZE,
  BOARD_CLASS_SELECTOR,
  ZERO,
  ONE,
  PLACEHOLDER,
  GAME_OVER_RECT_COLOR,
  GAME_OVER_TEXT_FONT,
  GAME_OVER_TEXT_COLOR,
  GAME_OVER_TEXT,
} from './constants';
import { Piece } from './Piece';

interface Props {
  target: HTMLElement;
}

export class Board {
  context: CanvasRenderingContext2D | null;
  currentPiece: Piece | null;
  temporaryPiece: Piece | null;
  grid: number[][];

  constructor({ target }: Props) {
    this.context = this.getContext(target, BOARD_CLASS_SELECTOR);
    this.grid = this.makeGrid();
    this.currentPiece = this.makePiece();
    this.temporaryPiece = this.makePiece();

    this.setBoardSize();
    this.setBoardScale();
    this.reset();
  }

  reset() {
    this.grid = this.makeGrid();
    this.currentPiece = this.makePiece();
  }

  setBoardSize() {
    if (!this.context) return;

    this.context.canvas.width = COLS * BLOCK_SIZE;
    this.context.canvas.height = ROWS * BLOCK_SIZE;
  }

  setBoardScale() {
    if (!this.context) return;

    this.context.scale(BLOCK_SIZE, BLOCK_SIZE);
  }

  getContext(target: HTMLElement, selector: string) {
    const canvas = target.querySelector<HTMLCanvasElement>(selector);

    if (canvas === null) return null;

    return canvas.getContext('2d');
  }

  makePiece() {
    if (this.context)
      return new Piece({ context: this.context, grid: this.grid });

    return null;
  }

  makeGrid() {
    return Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }).map(() => PLACEHOLDER)
    );
  }

  getClearedLines() {
    const copiedGrid = [...this.grid];
    const lines = this.grid.reduce((acc, row, rowIndex) => {
      if (row.every((value) => value > 0)) {
        copiedGrid.splice(rowIndex, 1);
        copiedGrid.unshift(Array.from({ length: COLS }).map(() => 0));

        return acc + 1;
      }

      return acc;
    }, 0);

    this.grid = copiedGrid;

    return lines;
  }

  cleanBoard() {
    if (!this.context) return;

    const { width, height } = this.context.canvas;

    this.context.clearRect(ZERO, ZERO, width, height);
  }

  drawPieces() {
    if (!this.context || !this.currentPiece) return;

    this.currentPiece.draw();

    this.grid.forEach((row, yPosition) => {
      row.forEach((value, xPosition) => {
        this.drawPiece(value, xPosition, yPosition);
      });
    });
  }

  drawPiece(value: number, xPosition: number, yPosition: number) {
    if (value > 0 && this.context) {
      this.context.fillStyle = COLORS[value - 1];
      this.context.fillRect(xPosition, yPosition, 1, 1);
    }
  }

  writeGameOverText() {
    if (!this.context) return;

    this.context.fillStyle = GAME_OVER_RECT_COLOR;
    this.context.fillRect(1, 3, 8, 1.2);
    this.context.font = GAME_OVER_TEXT_FONT;
    this.context.fillStyle = GAME_OVER_TEXT_COLOR;
    this.context.fillText(GAME_OVER_TEXT, 1.8, 4);
  }

  movePiece(changeX: number, changeY: number) {
    this.currentPiece?.move(changeX, changeY);
  }

  rotatePiece() {
    this.currentPiece?.rotate();
  }
}
