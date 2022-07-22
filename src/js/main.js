import { COLS, ROWS, BLOCK_SIZE, POINTS, LEVEL } from './constants';
import { Board } from './board';
import '../css/styles.css';

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

let time = null;
let requestId = null;
let accountValues = {
  score: 0,
  lines: 0,
  level: 0,
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
  ArrowLeft: (p) => ({ ...p, x: p.x - 1 }),
  ArrowRight: (p) => ({ ...p, x: p.x + 1 }),
  ArrowUp: (p) => p.rotate(p),
  ArrowDown: (p) => ({ ...p, y: p.y + 1 }),
  Space: (p) => ({ ...p, y: p.y + 1 }),
};

document.addEventListener('keydown', (event) => {
  if (moves[event.code]) {
    event.preventDefault();

    let p = moves[event.code](board.piece);
    if (event.code === 'Space') {
      while (board.valid(p)) {
        account.score += POINTS.HADR_DROP;
        board.piece.move(p);
        board.draw();
        p = moves['Space'](board.piece);
      }
    } else if (event.code === 'ArrowUp') {
      if (board.valid(p)) {
        board.piece.shape = p.shape;
        board.draw();
      }
    } else {
      if (board.valid(p)) {
        if (event.code === 'ArrowDown') {
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
  account.score = 0;
  account.lines = 0;
  account.level = 0;
  time = { start: 0, elapsed: 0, level: LEVEL[0] };
}

function gameOver() {
  cancelAnimationFrame(requestId);
  ctx.fillStyle = 'black';
  ctx.fillRect(1, 3, 8, 1.2);
  ctx.font = '1px Arial';
  ctx.fillStyle = 'red';
  ctx.fillText('GAME OVER', 1.8, 4);
}

function animate(now = 0) {
  time.elapsed = now - time.start;
  if (time.elapsed > time.level) {
    time.start = now;
    if (!board.drop()) {
      gameOver();
      return;
    }
  }
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  board.draw();
  board.clearLine(account, time);

  requestId = requestAnimationFrame(animate);
}

function updateAccount(prop, value) {
  let element = document.getElementById(prop);
  if (element) {
    element.textContent = value;
  }
}

window.play = play;
