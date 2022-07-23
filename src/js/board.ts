import {
  ROWS,
  COLS,
  COLORS,
  POINTS,
  LEVEL,
  BLOCK_SIZE,
  LINES_PER_LEVEL,
  BOARD_ID_SELECTOR,
} from './constants';
import { Piece } from './piece';

interface Props {
  target: HTMLElement;
}

export class Board {
  context;
  grid;
  piece;

  constructor({ target }: Props) {
    this.context = this.getContext(target, BOARD_ID_SELECTOR);
    this.grid = this.getGrid();
    this.piece = this.getPiece();

    this.setBoardSize();
    this.setBoardScale();
    this.reset();
  }

  reset() {
    this.grid = this.getGrid();
    this.piece = this.getPiece();
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
    const canvas = document.querySelector<HTMLCanvasElement>(selector);

    if (canvas === null) return null;

    return canvas.getContext('2d');
  }

  cleanBoard() {
    if (!this.context) return;

    const { width, height } = this.context.canvas;

    this.context.clearRect(0, 0, width, height);
  }

  getPiece() {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );
    let piece = new Piece(this.context);
    piece.draw();

    return piece;
  }

  getGrid() {
    return Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }).map(() => 0)
    );
  }

  isEmpty(value) {
    if (value === 0) {
      return true;
    } else {
      return false;
    }
  }

  insideWalls(x, y) {
    return x >= 0 && x < COLS && y < ROWS;
  }

  notQccupied(x, y) {
    return this.grid[y] && this.grid[y][x] === 0;
  }

  valid(p) {
    return p.shape.every((row, dy) => {
      return row.every((value, dx) => {
        let x = p.x + dx;
        let y = p.y + dy;
        return (
          this.isEmpty(value) ||
          (this.notQccupied(x, y) && this.insideWalls(x, y))
        );
      });
    });
  }

  drop() {
    let p = { ...this.piece, y: this.piece.y + 1 };
    if (this.valid(p)) {
      this.piece.move(p);
    } else {
      this.freeze();
      if (this.piece.y === 0) {
        return false;
      }
      getthis.piece();
    }
    return true;
  }

  freeze() {
    this.piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.grid[y + piece.y][x + piece.x] = value;
        }
      });
    });
  }

  drawPieces() {
    this.piece.draw();

    this.grid.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.context.fillStyle = COLORS[value - 1];
          this.context.fillRect(x, y, 1, 1);
        }
      });
    });
  }

  getClearLinePoints = (lines) => {
    switch (lines) {
      case 1:
        return POINTS.SINGLE;
      case 2:
        return POINTS.DOUBLE;
      case 3:
        return POINTS.TRIPLE;
      case 4:
        return POINTS.TETRIS;
      default:
        return 1600;
    }
  };

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
    // if (lines > 0) {
    //   account.score += (account.level + 1) * this.getClearLinePoints(lines);
    //   account.lines += lines;

    //   if (account.lines >= LINES_PER_LEVEL) {
    //     account.level++;
    //     account.lines -= LINES_PER_LEVEL;

    //     time.level = LEVEL[account.level];
    //   }
    // }
  }
}
