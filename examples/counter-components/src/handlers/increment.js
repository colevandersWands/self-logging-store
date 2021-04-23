import { read, write } from '../init/store.js';

import { renderNumber } from '../components/number.js';

export const closeIncrementHandler = (numberContainer, operation) => {
  // event handler with the closed element to update
  const incrementHandler = () => {
    // read the current state
    const oldLevel = read('level');

    // check if the level is in range
    if (oldLevel >= 1 && oldLevel <= 10) {
      // do the thing
      let newLevel = oldLevel;
      if (operation === 'up' && oldLevel !== 10) {
        newLevel = oldLevel + 1;
      } else if (operation === 'down' && oldLevel !== 1) {
        newLevel = oldLevel - 1;
      }

      // only update the UI and state if the level changed
      if (oldLevel !== newLevel) {
        // update UI
        const newNumberEl = renderNumber(newLevel);
        numberContainer.innerHTML = '';
        numberContainer.appendChild(newNumberEl);

        // update state
        write('level', newLevel);

        // log the interaction
        console.log(operation + ' 1:', newLevel);
      }
    }
  };
  return incrementHandler;
};
