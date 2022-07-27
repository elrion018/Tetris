import { Game } from './Game';
import { Board } from './Board';

import {
  CONTAINER_CLASS_SELECTOR,
  BUTTON_CLASS_SELECTOR,
  EVENT,
} from './constants';
import '../css/styles.css';

const play = () => {
  const target = document.querySelector<HTMLDivElement>(
    CONTAINER_CLASS_SELECTOR
  );

  if (target !== null) new Game({ target });
};

const button = document.querySelector<HTMLButtonElement>(BUTTON_CLASS_SELECTOR);

if (button) button.addEventListener(EVENT.CLICK, play);

// keys
// const moves = {
//   ArrowLeft: (p) => ({ ...p, x: p.x - 1 }),
//   ArrowRight: (p) => ({ ...p, x: p.x + 1 }),
//   ArrowUp: (p) => p.rotate(p),
//   ArrowDown: (p) => ({ ...p, y: p.y + 1 }),
//   Space: (p) => ({ ...p, y: p.y + 1 }),
// };

// document.addEventListener('keydown', (event) => {
//   if (moves[event.code]) {
//     event.preventDefault();

//     let p = moves[event.code](board.piece);
//     if (event.code === 'Space') {
//       while (board.valid(p)) {
//         account.score += POINTS.HADR_DROP;
//         board.piece.move(p);
//         board.draw();
//         p = moves['Space'](board.piece);
//       }
//     } else if (event.code === 'ArrowUp') {
//       if (board.valid(p)) {
//         board.piece.shape = p.shape;
//         board.draw();
//       }
//     } else {
//       if (board.valid(p)) {
//         if (event.code === 'ArrowDown') {
//           account.score += POINTS.SOFT_DROP;
//         }
//         board.piece.move(p);
//         board.draw();
//       }
//     }
//   }
// });
