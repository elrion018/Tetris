import { COLORS, COLS, PLACEHOLDER, ROWS, SHAPES, ZERO } from './constants';

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

  constructor({ context, grid }: Props) {
    this.context = context;
    this.xPosition = 3;
    this.yPosition = 0;

    const typeId = this.randomizePieceType(COLORS.length);

    this.shape = SHAPES[typeId];
    this.grid = grid;
    this.color = COLORS[typeId];
  }

  randomizePieceType(types: number) {
    return Math.floor(Math.random() * types);
  }

  getShape() {
    return [...this.shape];
  }

  getPositions() {
    const { xPosition, yPosition } = this;

    return { xPosition, yPosition };
  }

  setPositions(newXposition: number, newYposition: number) {
    this.xPosition = newXposition;
    this.yPosition = newYposition;
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
      this.checkInsideHorizontalEdge(newShape, this.xPosition) &&
      this.checkInsideVerticalEdge(newShape, this.yPosition) &&
      this.checkNotQccupiedPositions(newShape, this.xPosition, this.yPosition)
    ) {
      this.shape = structuredClone(newShape);

      return true;
    }
  }

  checkPlaceHolder(placeholder: number) {
    return placeholder === PLACEHOLDER;
  }

  checkInsideHorizontalEdge(shape: number[][], xPosition: number) {
    return shape.every((row, shapeY) => {
      return row.every((value, shapeX) => {
        if (this.checkPlaceHolder(value)) return true;

        const shapeXposition = xPosition + shapeX;

        return shapeXposition >= ZERO && shapeXposition < COLS;
      });
    });
  }

  checkInsideVerticalEdge(shape: number[][], yPosition: number) {
    return shape.every((row, shapeY) => {
      return row.every((value, shapeX) => {
        if (this.checkPlaceHolder(value)) return true;

        const shapeYposition = yPosition + shapeY;

        return shapeYposition >= ZERO && shapeYposition < ROWS;
      });
    });
  }

  checkNotQccupiedPositions(
    shape: number[][],
    xPosition: number,
    yPosition: number
  ) {
    return shape.every((row, shapeY) => {
      return row.every((value, shapeX) => {
        if (this.checkPlaceHolder(value)) return true;

        const shapeXposition = xPosition + shapeX;
        const shapeYposition = yPosition + shapeY;

        return this.grid[shapeYposition][shapeXposition] === PLACEHOLDER;
      });
    });
  }

  move(changeX: number, changeY: number) {
    const changedXposition = this.xPosition + changeX;
    const changedYposition = this.yPosition + changeY;

    if (!this.checkInsideHorizontalEdge(this.shape, changedXposition)) return;

    if (!this.checkInsideVerticalEdge(this.shape, changedYposition))
      return this.fillShapeToGrid();

    if (
      this.checkNotQccupiedPositions(
        this.shape,
        changedXposition,
        changedYposition
      )
    ) {
      this.xPosition = changedXposition;
      this.yPosition = changedYposition;

      return;
    }

    this.fillShapeToGrid();
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
