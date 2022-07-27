import { UserInfo } from './User';
import { Piece } from './Piece';
import { EVENT, ONE, ZERO } from './constants';
import { Board } from './board';

type DirectionKeyHandler = (piece: Piece, board: Board) => void;

interface DirectionKeyHandlers {
  ArrowLeft: DirectionKeyHandler;
  ArrowRight: DirectionKeyHandler;
  ArrowUp: DirectionKeyHandler;
  ArrowDown: DirectionKeyHandler;
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
      ArrowLeft: (piece: Piece, board: Board) => {
        board.movePiece(-ONE, ZERO);
      },

      ArrowRight: (piece: Piece, board: Board) => {
        board.movePiece(ONE, ZERO);
      },

      ArrowUp: (piece: Piece, board: Board) => {
        board.rotatePiece();
      },

      ArrowDown: (piece: Piece, board: Board) => {
        board.movePiece(ZERO, ONE);
      },
    };
  }

  render(userInfo: UserInfo) {
    Object.entries(userInfo).forEach(([key, value]) => {
      const element = this.target.querySelector(`#${key}`);

      if (element) element.textContent = value;
    });
  }

  attachKeyboardEvent() {
    document.addEventListener(EVENT.KEYDOWN, (event: KeyboardEventInit) => {
      const { code } = event;

      if (!code) return;

      const pressedKey =
        this.directionKeyHandlers[
          code as keyof typeof this.directionKeyHandlers
        ];
      const currentPiece = this.board.getCurrentPiece();

      if (!pressedKey) return;

      if (currentPiece) pressedKey(currentPiece, this.board);
    });
  }
}
