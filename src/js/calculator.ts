import { LINES, SCORES, ZERO } from './constants';
import { Checker } from './Checker';

interface GetCalculatedScoreParams {
  score: number;
  level: number;
  lines: number;
}

export class Calculator {
  getCalculatedScore({ score, level, lines }: GetCalculatedScoreParams) {
    const { SINGLE, DOUBLE, TRIPLE, TETRIS, UPPER_TETRIS } = SCORES;

    switch (lines) {
      case LINES.SINGLE:
        return score + SINGLE * level;

      case LINES.DOUBLE:
        return score + DOUBLE * level;

      case LINES.TRIPLE:
        return score + TRIPLE * level;

      case LINES.TETRIS:
        return score + TETRIS * level;

      default:
        return score + UPPER_TETRIS * level;
    }
  }

  getRaisedLevel(lines: number, level: number) {
    if (Checker.checkLinesUpperLinesPerLevel(lines)) return level + 1;

    return level;
  }
}
