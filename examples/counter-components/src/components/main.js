import { renderNumber } from './number.js';
import { renderButton } from './button.js';

import { closeIncrementHandler } from '../handlers/increment.js';

export const main = level => {
  const numberEl = renderNumber(level);

  const upButton = renderButton('+');
  const upHandler = closeIncrementHandler(numberEl, 'up');
  upButton.addEventListener('click', upHandler);

  const downButton = renderButton('-');
  const downHandler = closeIncrementHandler(numberEl, 'down');
  downButton.addEventListener('click', downHandler);

  const container = document.createElement('div');
  container.appendChild(downButton);
  container.appendChild(numberEl);
  container.appendChild(upButton);

  return container;
};
