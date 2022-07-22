import { UserInfo } from './game';

import { LINES_PER_LEVEL, LINES, POINTS, ZERO } from './constants';

interface Props {
  userInfo: UserInfo;
}

export class Calculator {
  userInfo: UserInfo;

  constructor({ userInfo }: Props) {
    this.userInfo = userInfo;
  }

  getCalculatedUserInfoWithLines(lines: number): UserInfo | null {
    const { level, score } = this.userInfo;

    if (lines > 0) {
      const calculatedScore = this.getCalculatedScore(score, lines, level);
      const raisedLevel = this.getRaisedLevel(lines, level);

      return {
        score: calculatedScore,
        lines: raisedLevel > level ? ZERO : lines,
        level: raisedLevel,
      };
    }

    return { score, lines, level };
  }

  getCalculatedScore(score: number, lines: number, level: number) {
    switch (lines) {
      case LINES.SINGLE:
        return score + POINTS.SINGLE * level;

      case LINES.DOUBLE:
        return score + POINTS.DOUBLE * level;

      case LINES.TRIPLE:
        return score + POINTS.TRIPLE * level;

      case LINES.TETRIS:
        return score + POINTS.TETRIS * level;

      default:
        return score + POINTS.UPPER_TETRIS * level;
    }
  }

  getRaisedLevel(lines: number, level: number) {
    if (this.checkLinesUpperLinesPerLevel(lines)) return level + 1;

    return level;
  }

  checkLinesUpperLinesPerLevel(lines: number) {
    return lines >= LINES_PER_LEVEL;
  }
}
