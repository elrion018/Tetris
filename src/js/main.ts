import { Game } from './Game';

import {
  CONTAINER_CLASS_SELECTOR,
  BUTTON_CLASS_SELECTOR,
  EVENT,
} from './constants';
import '../css/styles.css';

const play = () => {
  const target = document.querySelector<HTMLDivElement>(
    CONTAINER_CLASS_SELECTOR
  );

  if (target !== null) new Game({ target });
};

const button = document.querySelector<HTMLButtonElement>(BUTTON_CLASS_SELECTOR);

if (button) button.addEventListener(EVENT.CLICK, play);
