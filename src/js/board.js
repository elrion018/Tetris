import { ROWS, COLS } from "./constants";

export class Board {
  grid;

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
}
