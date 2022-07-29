import { Checker } from './Checker';

import { COLORS, PIECE_STATUS, SHAPES } from './constants';

const { COLLISION, STOP, MOVE } = PIECE_STATUS;

type Status = typeof COLLISION | typeof STOP | typeof MOVE;

interface Props {
  context: CanvasRenderingContext2D;
  grid: number[][];
}

export class Piece {
  context: CanvasRenderingContext2D;
  xPosition: number;
  yPosition: number;
  color: string;
  shape: number[][];
  grid: number[][];
  status: Status;

  constructor({ context, grid }: Props) {
    this.context = context;
    this.xPosition = 3;
    this.yPosition = 0;

    const typeId = this.randomizePieceType(COLORS.length);

    this.color = COLORS[typeId];
    this.shape = SHAPES[typeId];
    this.grid = grid;
    this.status = MOVE;
  }

  randomizePieceType(types: number) {
    return Math.floor(Math.random() * types);
  }

  getPositions() {
    return { xPosition: this.xPosition, yPosition: this.yPosition };
  }

  getStatus() {
    return this.status;
  }

  draw() {
    this.context.fillStyle = this.color;
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.context.fillRect(this.xPosition + x, this.yPosition + y, 1, 1);
        }
      });
    });
  }

  rotate() {
    const oldShape = structuredClone(this.shape);
    const newShape = [...oldShape];

    for (let y = 0; y < oldShape.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [oldShape[x][y], oldShape[y][x]] = [oldShape[y][x], newShape[x][y]];
      }
    }

    newShape.forEach((row) => row.reverse());

    if (
      Checker.checkInsideHorizontalEdge({
        shape: newShape,
        xPosition: this.xPosition,
      }) &&
      Checker.checkInsideVerticalEdge({
        shape: newShape,
        yPosition: this.yPosition,
      }) &&
      Checker.checkNotQccupiedPositions({
        grid: this.grid,
        shape: newShape,
        xPosition: this.xPosition,
        yPosition: this.yPosition,
      })
    ) {
      this.shape = structuredClone(newShape);

      return true;
    }
  }

  move(changeX: number, changeY: number) {
    const changedXposition = this.xPosition + changeX;
    const changedYposition = this.yPosition + changeY;

    if (
      !Checker.checkInsideHorizontalEdge({
        shape: this.shape,
        xPosition: changedXposition,
      })
    ) {
      this.status = COLLISION;

      return;
    }

    if (
      !Checker.checkInsideVerticalEdge({
        shape: this.shape,
        yPosition: changedYposition,
      })
    ) {
      this.status = STOP;

      return;
    }

    if (
      !Checker.checkNotQccupiedPositions({
        grid: this.grid,
        shape: this.shape,
        xPosition: changedXposition,
        yPosition: changedYposition,
      })
    ) {
      this.status = STOP;

      return;
    }

    this.xPosition = changedXposition;
    this.yPosition = changedYposition;
  }

  fillShapeToGrid() {
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0)
          this.grid[y + this.yPosition][x + this.xPosition] = value;
      });
    });
  }
}
