import { BUTTON_CLASS_SELECTOR, EVENT, ONE, ZERO } from './constants';
import { Game } from './Game';

type DirectionKeyHandler = (game: Game) => void;

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
  game: Game;
}

export class View {
  target: HTMLElement;
  game: Game;
  directionKeyHandlers: DirectionKeyHandlers;

  constructor({ target, game }: Props) {
    this.target = target;
    this.game = game;
    this.directionKeyHandlers = {
      ArrowLeft: (game: Game) => {
        game.movePieceByKey(-ONE, ZERO);
      },

      ArrowRight: (game: Game) => {
        game.movePieceByKey(ONE, ZERO);
      },

      ArrowUp: (game: Game) => {
        game.rotatePiece();
      },

      ArrowDown: (game: Game) => {
        game.movePieceByKey(ZERO, ONE);
      },

      Space: (game: Game) => {
        game.dropPiece();
      },
    };

    this.start();
  }

  start() {
    this.attachEventHandlers();
  }

  render({ score, lines, level }: RenderParams) {
    Object.entries({ score, lines, level }).forEach(([key, value]) => {
      const element = this.target.querySelector(`#${key}`);

      if (element) element.textContent = value.toString();
    });
  }

  attachEventHandlers() {
    this.attachKeyboardEventHandler();
    this.attachPlayButtonEventHandler();
  }

  attachKeyboardEventHandler() {
    document.addEventListener(EVENT.KEYDOWN, this.movePieceByKey.bind(this));
  }

  attachPlayButtonEventHandler() {
    const button = document.querySelector<HTMLButtonElement>(
      BUTTON_CLASS_SELECTOR
    );

    if (button)
      button.addEventListener(EVENT.CLICK, this.playButtonHandler.bind(this));
  }

  playButtonHandler() {
    const gameId = this.game.getGameId();

    if (gameId) {
      this.game.reset();
      this.game.start();

      return;
    }

    this.game.start();
  }

  movePieceByKey(event: any) {
    const { code } = event;
    const pressedDirectionKey =
      this.directionKeyHandlers[code as keyof typeof this.directionKeyHandlers];

    if (!pressedDirectionKey) return;

    event.preventDefault();

    if (pressedDirectionKey) pressedDirectionKey(this.game);
  }
}
