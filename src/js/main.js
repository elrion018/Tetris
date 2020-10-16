import { COLS, ROWS, BLOCK_SIZE, KEY, POINTS } from "./constants";
import { Board } from "./board";
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

let time = null;
let accountValues = {
  score: 0,
  lines: 0,
};
let account = new Proxy(accountValues, {
  set: (target, prop, value) => {
    target[prop] = value;
    updateAccount(prop, value);
    return true;
  },
});
let board = new Board(ctx);

// keys
const moves = {
  [KEY.LEFT]: (p) => ({ ...p, x: p.x - 1 }),
  [KEY.RIGHT]: (p) => ({ ...p, x: p.x + 1 }),
  [KEY.UP]: (p) => p.rotate(p),
  [KEY.DOWN]: (p) => ({ ...p, y: p.y + 1 }),
  [KEY.SPACE]: (p) => ({ ...p, y: p.y + 1 }),
};

document.addEventListener("keydown", (event) => {
  if (moves[event.keyCode]) {
    event.preventDefault();

    let p = moves[event.keyCode](board.piece);
    if (event.keyCode === KEY.SPACE) {
      while (board.valid(p)) {
        account.score += POINTS.HADR_DROP;
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
        if (event.keyCode === KEY.DOWN) {
          account.score += POINTS.SOFT_DROP;
        }
        board.piece.move(p);
        board.draw();
      }
    }
  }
});

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
  board.clearLine(account);
  requestAnimationFrame(animate);
}

function updateAccount(prop, value) {
  let element = document.getElementById(prop);
  if (element) {
    element.textContent = value;
  }
}

window.play = play;
