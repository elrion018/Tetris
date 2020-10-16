import { ROWS, COLS, COLORS } from "./constants";

export class Board {
  grid;
  piece;
  ctx;

  constructor(ctx) {
    this.ctx = ctx;
  }

  reset() {
    this.grid = this.getEmptyBoard();
  }

  getEmptyBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

  isEmpty(value) {
    if (value === 0) {
      return true;
    } else {
      return false;
    }
  }

  insideWalls(x) {
    if (x >= 0 && x < COLS) {
      return true;
    } else {
      return false;
    }
  }
  aboveFloor(y) {
    if (y < ROWS) {
      return true;
    } else {
      return false;
    }
  }

  valid(p) {
    return p.shape.every((row, dy) => {
      return row.every((value, dx) => {
        let x = p.x + dx;
        let y = p.y + dy;
        return (
          this.isEmpty(value) || (this.aboveFloor(y) && this.insideWalls(x))
        );
      });
    });
  }
  freeze() {
    this.piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.grid[y + this.piece.y][x + this.piece.x] = value;
        }
      });
    });
  }
  drawBoard() {
    this.grid.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillStyle = COLORS[value];
          this.ctx.fillRect(x, y, 1, 1);
        }
      });
    });
  }
  draw() {
    this.piece.draw();
    this.drawBoard();
  }
}
