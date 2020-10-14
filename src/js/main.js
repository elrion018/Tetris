import { COLS, ROWS, BLOCK_SIZE, KEY } from "./constants";
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
  board.piece = piece;
  // console.log(board.piece);
}

// keys
const moves = {
  [KEY.LEFT]: (p) => ({ ...p, x: p.x - 1 }),
  [KEY.RIGHT]: (p) => ({ ...p, x: p.x + 1 }),
  [KEY.DOWN]: (p) => ({ ...p, y: p.y + 1 }),
};

document.addEventListener("keydown", (event) => {
  if (moves[event.keyCode]) {
    event.preventDefault();

    let p = moves[event.keyCode](board.piece);

    board.piece.move(p);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    board.piece.draw();
  }
});

ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

window.play = play;
