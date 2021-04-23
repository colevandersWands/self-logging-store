import { read, write } from '../init/store.js';

export const incrementHandler = event => {
  const oldLevel = read('level');

  // check if the level is in range
  if (oldLevel >= 1 && oldLevel <= 10) {
    const operation = event.target.id;

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
      const numberEl = document.getElementById('the-number');
      numberEl.innerHTML = newLevel;
      numberEl.className =
        newLevel <= 3 ? 'low' : newLevel <= 7 ? 'medium' : 'high';

      // update state
      write('level', newLevel);

      // log the interaction
      console.log(operation + '1:', newLevel);
    }
  }
};
