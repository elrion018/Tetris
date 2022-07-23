import { UserInfo } from './User';

interface Props {
  target: HTMLElement;
}

export class View {
  target: HTMLElement;

  constructor({ target }: Props) {
    this.target = target;
  }

  render(userInfo: UserInfo) {
    Object.entries(userInfo).forEach(([key, value]) => {
      const element = this.target.querySelector(`#${key}`);

      if (element) element.textContent = value;
    });
  }
}
