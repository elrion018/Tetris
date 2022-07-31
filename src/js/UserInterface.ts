import { EVENT, ONE, ZERO } from './constants';
import { Board } from './board';

type DirectionKeyHandler = (board: Board) => void;

interface DirectionKeyHandlers {
  ArrowLeft: DirectionKeyHandler;
  ArrowRight: DirectionKeyHandler;
  ArrowUp: DirectionKeyHandler;
  ArrowDown: DirectionKeyHandler;
  Space: DirectionKeyHandler;
}

interface RenderParams {
  score: number;
  lines: number;
  level: number;
}

interface Props {
  target: HTMLElement;
  board: Board;
}

export class UserInterface {
  target: HTMLElement;
  board: Board;
  directionKeyHandlers: DirectionKeyHandlers;

  constructor({ target, board }: Props) {
    this.target = target;
    this.board = board;
    this.directionKeyHandlers = {
      ArrowLeft: (board: Board) => {
        board.movePiece(-ONE, ZERO);
      },

      ArrowRight: (board: Board) => {
        board.movePiece(ONE, ZERO);
      },

      ArrowUp: (board: Board) => {
        board.rotatePiece();
      },

      ArrowDown: (board: Board) => {
        board.movePiece(ZERO, ONE);
      },

      Space: (board: Board) => {
        board.dropPiece();
      },
    };
  }

  render({ score, lines, level }: RenderParams) {
    Object.entries({ score, lines, level }).forEach(([key, value]) => {
      const element = this.target.querySelector(`#${key}`);

      if (element) element.textContent = value.toString();
    });
  }

  attachKeyboardEvent() {
    document.addEventListener(EVENT.KEYDOWN, (event: any) => {
      const { code } = event;
      const pressedDirectionKey =
        this.directionKeyHandlers[
          code as keyof typeof this.directionKeyHandlers
        ];

      if (!pressedDirectionKey) return;

      event.preventDefault();

      if (pressedDirectionKey) pressedDirectionKey(this.board);
    });
  }
}
