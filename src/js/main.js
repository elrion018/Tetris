import { COLS, ROWS, BLOCK_SIZE } from "./constants";
import { Board } from "./board";
import { Piece } from "./piece";
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
let board = new Board();
function play() {
  board.reset();
  console.table(board.grid);
  let piece = new Piece(ctx);
  piece.draw();
}

ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

window.play = play;
