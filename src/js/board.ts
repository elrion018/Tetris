import {
  ROWS,
  COLS,
  COLORS,
  POINTS,
  LEVEL,
  LINES_PER_LEVEL,
} from './constants';
import { Piece } from './piece';

interface Props {
  context: CanvasRenderingContext2D;
}

export const Board = ({ context }: Props) => {
  const reset = () => {
    grid = getGrid();
    piece = getPiece();
  };

  const getPiece = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    let piece = new Piece(context);
    piece.draw();

    return piece;
  };

  const getGrid = () => Array.from({ length: ROWS }, () => Array(COLS).fill(0));

  let grid = getGrid();
  let piece = getPiece();

  const isEmpty = (value) => {
    if (value === 0) {
      return true;
    } else {
      return false;
    }
  };

  const insideWalls = (x, y) => {
    return x >= 0 && x < COLS && y < ROWS;
  };

  const notQccupied = (x, y) => {
    return grid[y] && grid[y][x] === 0;
  };

  const valid = (p) => {
    return p.shape.every((row, dy) => {
      return row.every((value, dx) => {
        let x = p.x + dx;
        let y = p.y + dy;
        return isEmpty(value) || (notQccupied(x, y) && insideWalls(x, y));
      });
    });
  };

  const drop = () => {
    let p = { ...piece, y: piece.y + 1 };
    if (valid(p)) {
      piece.move(p);
    } else {
      freeze();
      if (piece.y === 0) {
        return false;
      }
      getPiece();
    }
    return true;
  };

  const freeze = () => {
    piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          grid[y + piece.y][x + piece.x] = value;
        }
      });
    });
  };

  const drawBoard = () => {
    grid.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          context.fillStyle = COLORS[value - 1];
          context.fillRect(x, y, 1, 1);
        }
      });
    });
  };
  const draw = () => {
    piece.draw();
    drawBoard();
  };

  const getClearLinePoints = (lines) => {
    switch (lines) {
      case 1:
        return POINTS.SINGLE;
      case 2:
        return POINTS.DOUBLE;
      case 3:
        return POINTS.TRIPLE;
      case 4:
        return POINTS.TETRIS;
      default:
        return 1600;
    }
  };

  const clearLine = (account, time) => {
    let lines = 0;
    grid.forEach((row, y) => {
      if (row.every((value) => value > 0)) {
        lines++;
        grid.splice(y, 1);
        grid.unshift(Array(COLS).fill(0));
      }
    });
    if (lines > 0) {
      account.score += (account.level + 1) * getClearLinePoints(lines);
      account.lines += lines;

      if (account.lines >= LINES_PER_LEVEL) {
        account.level++;
        account.lines -= LINES_PER_LEVEL;

        time.level = LEVEL[account.level];
      }
    }
  };
};
