import { COLORS, SHAPES } from "./constants";

export class Piece {
  x;
  y;
  color;
  shape;
  ctx;

  constructor(ctx) {
    this.ctx = ctx;
    this.spawn();
  }

  spawn() {
    const typeId = this.randomizePieceType(SHAPES.length);
    this.shape = SHAPES[typeId];
    this.color = COLORS[typeId];

    this.x = 3;
    this.y = 0;
  }

  randomizePieceType(types) {
    return Math.floor(Math.random() * types);
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
        }
      });
    });
  }

  rotate(p) {
    let clone = JSON.parse(JSON.stringify(p));
    for (let y = 0; y < clone.shape.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [clone.shape[x][y], clone.shape[y][x]] = [
          clone.shape[y][x],
          p.shape[x][y],
        ];
      }
    }
    clone.shape.forEach((row) => row.reverse());

    return clone;
  }

  move(p) {
    this.x = p.x;
    this.y = p.y;
  }
}
