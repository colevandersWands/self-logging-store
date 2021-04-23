import { deepClone } from './deep-clone.js';
import { calledFrom } from './called-from.js';
import { isPlainObject } from './is-plain-object,hs';

const didNotPassValue = Symbol('no value');

export const createStore = (
  preState = {},
  config = {
    history: true,
    strict: true,
    out: console.log,
  }
) => {
  if (!isPlainObject(preState)) {
    throw new TypeError('state is not a plain object');
  }
  if (typeof config.out !== 'function') {
    throw new TypeError('config.out is not a function');
  }

  let state = deepClone(preState);
  const initialState = deepClone(state);

  const stateHistory = [
    {
      initialState,
    },
  ];

  const write = (key, value = didNotPassValue) => {
    if (value === didNotPassValue) {
      throw new Error('no value provided');
    }
    const writeLog = {
      write: key,
      value: value,
      before: deepClone(state),
    };
    state[key] = value;
    writeLog.after = state;
    writeLog.location = calledFrom();

    if (config.history) {
      stateHistory.push(deepClone(writeLog));
    }
  };

  const read = (key) => {
    if (typeof key !== 'string') {
      throw new TypeError('key is not a string');
    }

    const readValue = state[key];

    if (config.history) {
      stateHistory.push({
        read: key,
        value: deepClone(readValue),
        location: calledFrom(),
      });
    }
    return deepClone(readValue);
  };

  const history = (entries = -1) => {
    if (typeof entries !== 'number') {
      throw new TypeError('entries is not a number');
    }
    if (!Number.isInteger(entries)) {
      throw new RangeError('entries is not an integer');
    }
    if (entries < -1) {
      throw new RangeError('entries is less than -1');
    }

    if (entries === -1) {
      return deepClone(stateHistory);
    }
    if (entries >= 0) {
      const slicedHistory = stateHistory.slice(stateHistory.length - entries);
      return deepClone(slicedHistory);
    }
  };

  const log = (...logs) => {
    if (logs.length !== 0) {
      if (config.history) {
        stateHistory.push(
          deepClone({
            log: deepClone(logs),
            location: calledFrom(),
          })
        );
      }
      config.out(...logs);
    } else {
      if (config.history) {
        stateHistory.push(
          deepClone({
            log: history(),
            location: calledFrom(),
          })
        );
        config.out(calledFrom(), history());
      } else {
        config.out(deepClone(state));
      }
    }
  };

  return {
    read,
    write,
    log,
  };
};
