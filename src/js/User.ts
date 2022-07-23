export interface UserInfo {
  score: number;
  lines: number;
  level: number;
}

export class User {
  userInfo: UserInfo;

  constructor() {
    this.userInfo = { score: 0, lines: 0, level: 1 };
  }

  reset() {
    this.userInfo = { score: 0, lines: 0, level: 1 };
  }

  getUserInfo() {
    return { ...this.userInfo };
  }

  setUserInfo(userInfo: UserInfo) {
    this.userInfo = userInfo;
  }
}
