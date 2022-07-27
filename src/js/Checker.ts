import { COLS, PLACEHOLDER, ROWS, ZERO } from './constants';

interface CheckPlaceHolderParams {
  value: number;
}

interface CheckInsideHorizontalEdgeParams {
  shape: number[][];
  xPosition: number;
}

interface CheckInsideVerticalEdgeParams {
  shape: number[][];
  yPosition: number;
}

interface CheckNotQccupiedPositionsParams {
  shape: number[][];
  grid: number[][];
  xPosition: number;
  yPosition: number;
}

export class Checker {
  static checkPlaceHolder({ value }: CheckPlaceHolderParams) {
    return value === PLACEHOLDER;
  }

  static checkInsideHorizontalEdge({
    shape,
    xPosition,
  }: CheckInsideHorizontalEdgeParams) {
    return shape.every((row, shapeY) => {
      return row.every((value, shapeX) => {
        if (this.checkPlaceHolder({ value })) return true;

        const shapeXposition = xPosition + shapeX;

        return shapeXposition >= ZERO && shapeXposition < COLS;
      });
    });
  }

  static checkInsideVerticalEdge({
    shape,
    yPosition,
  }: CheckInsideVerticalEdgeParams) {
    return shape.every((row, shapeY) => {
      return row.every((value, shapeX) => {
        if (this.checkPlaceHolder({ value })) return true;

        const shapeYposition = yPosition + shapeY;

        return shapeYposition >= ZERO && shapeYposition < ROWS;
      });
    });
  }

  static checkNotQccupiedPositions({
    shape,
    grid,
    xPosition,
    yPosition,
  }: CheckNotQccupiedPositionsParams) {
    return shape.every((row, shapeY) => {
      return row.every((value, shapeX) => {
        if (this.checkPlaceHolder({ value })) return true;

        const shapeXposition = xPosition + shapeX;
        const shapeYposition = yPosition + shapeY;

        return grid[shapeYposition][shapeXposition] === PLACEHOLDER;
      });
    });
  }
}
