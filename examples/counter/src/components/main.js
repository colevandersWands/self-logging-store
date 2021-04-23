import { read } from '../init/store.js';

import { renderNumber } from './number.js';
import { renderButton } from './button.js';

import { closeIncrementHandler } from '../handlers/increment.js';

export const main = () => {
  const level = read('level');
  const numberEl = renderNumber(level);

  const upButton = renderButton('+');
  upButton.addEventListener('click', closeIncrementHandler(numberEl));

  const downButton = renderButton('-');
  downButton.addEventListener('click', closeIncrementHandler(numberEl));

  const container = document.createElement('div');
  container.appendChild(downButton);
  container.appendChild(numberEl);
  container.appendChild(upButton);

  return container;
};
