import { Game } from './Game';

import { CONTAINER_CLASS_SELECTOR } from './constants';
import '../css/styles.css';

const target = document.querySelector<HTMLDivElement>(CONTAINER_CLASS_SELECTOR);

if (target) new Game({ target });
