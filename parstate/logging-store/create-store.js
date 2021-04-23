import { deepClone } from './deep-clone.js';
import { calledFrom } from './called-from.js';
import { isPlainObject } from './is-plain-object.js';
import { validate } from './validate.js';
import { didNotPassValue } from './did-not-pass-value.js';

export const createStore = (preState = {}, strict = true) => {
  if (!isPlainObject(preState)) {
    throw new TypeError('state is not a plain object');
  }
  if (typeof strict !== 'boolean') {
    throw new TypeError('strict is not boolean');
  }

  let state = deepClone(preState);

  const initialState = deepClone(state);

  const stateHistory = [
    {
      initialState,
    },
  ];

  const write = (key, value = didNotPassValue) => {
    if (typeof key !== 'string') {
      throw new TypeError('key is not a string');
    }
    if (value === didNotPassValue) {
      throw new Error('no value passed to write');
    }

    const validation = validate(initialState, key, value);
    if (strict && validation instanceof Error) {
      throw validation;
    }

    const writeLog = {
      write: key,
      value: value,
      before: deepClone(state),
    };
    state[key] = value;
    writeLog.after = deepClone(state);
    writeLog.loc = calledFrom();
    stateHistory.push(writeLog);
  };

  const read = key => {
    if (typeof key !== 'string') {
      throw new TypeError('key is not a string');
    }
    const validation = validate(initialState, key);
    if (strict && validation instanceof Error) {
      throw validation;
    }

    const readValue = state[key];

    stateHistory.push({
      read: key,
      value: deepClone(readValue),
      loc: calledFrom(),
    });
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
      stateHistory.push(
        deepClone({
          log: deepClone(logs),
          loc: calledFrom(),
        })
      );
      console.log(...logs);
    } else {
      // stateHistory.push(
      //   deepClone({
      //     log: [],
      //     loc: calledFrom(),
      //   })
      // );
      console.log(calledFrom(), history());
    }
  };

  return {
    read,
    write,
    log,
  };
};
