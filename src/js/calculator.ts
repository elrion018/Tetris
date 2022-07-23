import { User, UserInfo } from './User';

import { LINES_PER_LEVEL, LINES, POINTS, ZERO } from './constants';

interface Props {
  user: User;
}

export class Calculator {
  user: User;

  constructor({ user }: Props) {
    this.user = user;
  }

  getCalculatedUserInfoWithLines(lines: number): UserInfo | null {
    const userInfo = this.user.getUserInfo();
    const { level, score } = userInfo;

    if (lines > 0) {
      const calculatedScore = this.getCalculatedScore(score, lines, level);
      const raisedLevel = this.getRaisedLevel(lines, level);

      return {
        score: calculatedScore,
        lines: raisedLevel > level ? ZERO : lines,
        level: raisedLevel,
      };
    }

    return null;
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
