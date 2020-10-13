import { ROWS, COLS } from "./constants";

export class Board {
  grid;

  reset() {
    this.grid = this.getEmptyBoard();
  }

  getEmptyBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }
}
