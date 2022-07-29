import { LINES, SCORES, ZERO } from './constants';
import { Checker } from './Checker';

interface GetCalculatedScoreParams {
  score: number;
  lines: number;
}

export class Calculator {
  getCalculatedScore({ score, lines }: GetCalculatedScoreParams) {
    const { SINGLE, DOUBLE, TRIPLE, TETRIS, UPPER_TETRIS } = SCORES;

    switch (lines) {
      case LINES.SINGLE:
        return score + SINGLE;

      case LINES.DOUBLE:
        return score + DOUBLE;

      case LINES.TRIPLE:
        return score + TRIPLE;

      case LINES.TETRIS:
        return score + TETRIS;

      default:
        return score + UPPER_TETRIS;
    }
  }

  getRaisedLevel(lines: number, level: number) {
    if (Checker.checkLinesUpperLinesPerLevel(lines)) return level + 1;

    return level;
  }
}
