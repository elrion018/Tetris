export interface UserInfo {
  score: number;
  lines: number;
  level: number;
}

const initialUserInfo = { score: 0, lines: 0, level: 1 };

export class User {
  userInfo: UserInfo;

  constructor() {
    this.userInfo = initialUserInfo;
  }

  reset() {
    this.userInfo = initialUserInfo;
  }

  getUserInfo() {
    return { ...this.userInfo };
  }

  setUserInfo(newUserInfo: UserInfo) {
    this.userInfo = newUserInfo;
  }

  updateUserInfo(newUserInfo: UserInfo | null) {
    if (newUserInfo) {
      this.setUserInfo(newUserInfo);

      return true;
    }

    return false;
  }
}
