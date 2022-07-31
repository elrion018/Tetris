import { LINES, SCORES, ZERO } from './constants';
import { Checker } from './Checker';

interface CalculateScoreByLineParams {
  lines: number;
}

export class Calculator {
  static calculateScoreByLine({ lines }: CalculateScoreByLineParams) {
    const { SINGLE, DOUBLE, TRIPLE, TETRIS, UPPER_TETRIS } = SCORES;

    switch (lines) {
      case LINES.SINGLE:
        return SINGLE;

      case LINES.DOUBLE:
        return DOUBLE;

      case LINES.TRIPLE:
        return TRIPLE;

      case LINES.TETRIS:
        return TETRIS;

      default:
        return UPPER_TETRIS;
    }
  }
}
