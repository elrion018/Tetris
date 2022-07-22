import {
  ROWS,
  COLS,
  COLORS,
  POINTS,
  LEVEL,
  BLOCK_SIZE,
  LINES_PER_LEVEL,
} from './constants';
import { Piece } from './piece';

interface Props {
  context: CanvasRenderingContext2D;
}

export class Board {
  context;
  grid;
  piece;

  constructor({ context }: Props) {
    this.context = context;
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
    this.context.canvas.width = COLS * BLOCK_SIZE;
    this.context.canvas.height = ROWS * BLOCK_SIZE;
  }

  setBoardScale() {
    this.context.scale(BLOCK_SIZE, BLOCK_SIZE);
  }

  cleanBoard() {
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
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
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

  drawBoard() {
    this.grid.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.context.fillStyle = COLORS[value - 1];
          this.context.fillRect(x, y, 1, 1);
        }
      });
    });
  }

  draw() {
    this.piece.draw();
    drawBoard();
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

  clearLine = (account, time) => {
    let lines = 0;
    this.grid.forEach((row, y) => {
      if (row.every((value) => value > 0)) {
        lines++;
        this.grid.splice(y, 1);
        this.grid.unshift(Array(COLS).fill(0));
      }
    });
    if (lines > 0) {
      account.score += (account.level + 1) * this.getClearLinePoints(lines);
      account.lines += lines;

      if (account.lines >= LINES_PER_LEVEL) {
        account.level++;
        account.lines -= LINES_PER_LEVEL;

        time.level = LEVEL[account.level];
      }
    }
  };
}
