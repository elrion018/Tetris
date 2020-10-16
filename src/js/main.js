import { COLS, ROWS, BLOCK_SIZE, KEY } from "./constants";
import { Board } from "./board";
import { Piece } from "./piece";
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

let time = null;
let board = new Board(ctx);

// keys
const moves = {
  [KEY.LEFT]: (p) => ({ ...p, x: p.x - 1 }),
  [KEY.RIGHT]: (p) => ({ ...p, x: p.x + 1 }),
  [KEY.UP]: (p) => p.rotate(p),
  [KEY.DOWN]: (p) => ({ ...p, y: p.y + 1 }),
  [KEY.SPACE]: (p) => ({ ...p, y: p.y + 1 }),
};

function play() {
  resetGame();
  animate();
}

function resetGame() {
  board.reset();
  time = { start: 0, elapsed: 0, level: 1000 };
}

function animate(now = 0) {
  time.elapsed = now - time.start;
  if (time.elapsed > time.level) {
    time.start = now;
    board.drop();
  }
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  board.draw();
  board.clearLine();
  requestAnimationFrame(animate);
}

document.addEventListener("keydown", (event) => {
  if (moves[event.keyCode]) {
    event.preventDefault();

    let p = moves[event.keyCode](board.piece);
    if (event.keyCode === KEY.SPACE) {
      while (board.valid(p)) {
        board.piece.move(p);
        board.draw();
        p = moves[KEY.DOWN](board.piece);
      }
    } else if (event.keyCode === KEY.UP) {
      if (board.valid(p)) {
        board.piece.shape = p.shape;
        board.draw();
      }
    } else {
      if (board.valid(p)) {
        board.piece.move(p);
        board.draw();
      }
    }
  }
});

window.play = play;
