import { ROWS, COLS, COLORS } from "./constants";
import { Piece } from "./piece";
export class Board {
  grid;
  piece;
  ctx;

  constructor(ctx) {
    this.ctx = ctx;
  }

  reset() {
    this.grid = this.getEmptyBoard();
    this.getNewPiece();
  }

  getNewPiece() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    console.table(board.grid);
    let piece = new Piece(this.ctx);
    piece.draw();
    this.piece = piece;
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
      this.getNewPiece();
      console.table(this.grid);
    }
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
          this.ctx.fillStyle = COLORS[value - 1];
          this.ctx.fillRect(x, y, 1, 1);
        }
      });
    });
  }
  draw() {
    this.piece.draw();
    this.drawBoard();
  }

  clearLine() {
    this.grid.forEach((row, y) => {
      if (row.every((value) => value > 0)) {
        this.grid.splice(y, 1);

        this.grid.unshift(Array(COLS).fill(0));
      }
    });
  }
}
