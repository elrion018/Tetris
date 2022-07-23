import { COLORS, SHAPES } from './constants';

interface Props {
  context: CanvasRenderingContext2D;
}

export class Piece {
  context: CanvasRenderingContext2D;
  xPosition: number;
  yPosition: number;
  color: string;
  shape: number[][];

  constructor({ context }: Props) {
    this.context = context;

    this.xPosition = 3;
    this.yPosition = 0;

    const typeId = this.randomizePieceType(COLORS.length);
    this.shape = SHAPES[typeId];
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
    const copiedShape = [...this.shape];

    for (let y = 0; y < copiedShape.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [copiedShape[x][y], copiedShape[y][x]] = [
          copiedShape[y][x],
          this.shape[x][y],
        ];
      }
    }

    copiedShape.forEach((row) => row.reverse());

    return copiedShape;
  }

  drop() {
    this.yPosition++;
  }
}
