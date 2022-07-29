import { User, UserInfo } from './User';

import { LINES, POINTS, ZERO } from './constants';
import { Checker } from './Checker';

interface Props {
  user: User;
}

export class Calculator {
  user: User;

  constructor({ user }: Props) {
    this.user = user;
  }

  getCalculatedUserInfoWithLines(lines: number): UserInfo {
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

    return {
      score,
      lines,
      level,
    };
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
    if (Checker.checkLinesUpperLinesPerLevel(lines)) return level + 1;

    return level;
  }
}
