import { Game } from './game';
import { Board } from './board';

import {
  COLS,
  ROWS,
  BLOCK_SIZE,
  POINTS,
  LEVEL,
  BOARD_ID_SELECTOR,
  CONTAINER_ID_SELECTOR,
} from './constants';
import '../css/styles.css';

const getContext = () => {
  const canvas = document.querySelector<HTMLCanvasElement>(BOARD_ID_SELECTOR);

  if (canvas === null) return null;

  return canvas.getContext('2d');
};

const play = () => {
  const target = document.querySelector<HTMLDivElement>(CONTAINER_ID_SELECTOR);

  if (target !== null) new Game({ target });

  animate();
};

const context = getContext();

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
let board = new Board(context);

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

function resetGame() {
  board.reset();
  account.score = 0;
  account.lines = 0;
  account.level = 0;
  time = { start: 0, elapsed: 0, level: LEVEL[0] };
}

function gameOver() {
  cancelAnimationFrame(requestId);
  context.fillStyle = 'black';
  context.fillRect(1, 3, 8, 1.2);
  context.font = '1px Arial';
  context.fillStyle = 'red';
  context.fillText('GAME OVER', 1.8, 4);
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
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
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
