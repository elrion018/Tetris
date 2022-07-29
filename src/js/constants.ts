export const BOARD_CLASS_SELECTOR = '.game-board';
export const CONTAINER_CLASS_SELECTOR = '.container';
export const BUTTON_CLASS_SELECTOR = '.play-button';

export const COLS = 10;
export const ROWS = 20;
export const BLOCK_SIZE = 30;
export const ZERO = 0;
export const ONE = 1;
export const LINES_PER_LEVEL = 10;
export const PLACEHOLDER = 0;
export const ONE_HUNDRED_MS = 100;

export const COLORS = [
  'cyan',
  'blue',
  'orange',
  'yellow',
  'green',
  'purple',
  'red',
];

export const GAME_OVER_RECT_COLOR = 'black';
export const GAME_OVER_TEXT_FONT = '1px Arial';
export const GAME_OVER_TEXT_COLOR = 'red';
export const GAME_OVER_TEXT = 'GAME OVER';

export const EVENT = {
  CLICK: 'click',
  KEYDOWN: 'keydown',
};

export const PIECE_STATUS = {
  COLLISION: 'collision',
  STOP: 'stop',
  MOVE: 'move',
};

export const SCORES = {
  SINGLE: 100,
  DOUBLE: 300,
  TRIPLE: 500,
  TETRIS: 800,
  UPPER_TETRIS: 1600,

  SOFT_DROP: 10,
  HARD_DROP: 30,

  SCORE_FOR_LEVEL_UP: 1000,
};

export const LINES = {
  SINGLE: 1,
  DOUBLE: 2,
  TRIPLE: 3,
  TETRIS: 4,
};

export const TIME_FOR_MOVE_DOWN_BY_LEVEL = [
  PLACEHOLDER,
  800,
  720,
  640,
  560,
  480,
  400,
  320,
  240,
  160,
  100,
];

export const MAX_LEVEL = 10;

// 시각적으로 보기좋게 하기위해 PLACEHOLDER를 넣지않음
export const SHAPES = [
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0],
    [0, 2, 2, 0],
    [0, 2, 2, 0],
    [0, 0, 0, 0],
  ],
  [
    [3, 0, 0],
    [3, 3, 3],
    [0, 0, 0],
  ],
  [
    [4, 4, 0],
    [0, 4, 4],
    [0, 0, 0],
  ],
  [
    [0, 5, 0],
    [5, 5, 5],
    [0, 0, 0],
  ],
  [
    [0, 6, 6],
    [6, 6, 0],
    [0, 0, 0],
  ],
  [
    [0, 0, 7],
    [7, 7, 7],
    [0, 0, 0],
  ],
];
