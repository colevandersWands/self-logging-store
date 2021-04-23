'use strict';

import { deepClone } from './deep-clone.js';
import { deepMerge } from './deep-merge.js';
import { calledFrom } from './called-from.js';

const didNotPassKey = Symbol('no key');
const didNotPassValue = Symbol('no value');

export const createStore = (preState = {}, logging = true) => {
  if (Object.prototype.toString.call(preState) !== '[object Object]') {
    throw new TypeError('state is not an object');
  }
  if (typeof logging !== 'boolean') {
    throw new TypeError('logging is not a boolean');
  }

  let state = deepClone(preState);

  const stateHistory = [
    {
      initial: deepClone(state),
    },
  ];

  const write = logging
    ? (keyOrParState, value = didNotPassValue) => {
        if (
          Object.prototype.toString.call(keyOrParState) === '[object Object]'
        ) {
          const parState = keyOrParState;
          if (logging) {
            const writeLog = {
              write: deepClone(parState),
              before: deepClone(state),
            };
          }
          state = deepMerge(state, parState);
          if (logging) {
            writeLog.after = state;
            writeLog.location = calledFrom();
            stateHistory.push(deepClone(writeLog));
          }
        } else if (typeof keyOrParState === 'string') {
          if (value === didNotPassValue) {
            throw new Error('no value provided');
          }
          const key = keyOrParState;
          if (logging) {
            const writeLog = {
              write: key,
              value: value,
              before: deepClone(state),
            };
          }
          state[key] = value;
          if (logging) {
            writeLog.after = state;
            writeLog.location = calledFrom();
            stateHistory.push(deepClone(writeLog));
          }
        } else {
          throw new TypeError('first argument is not a string or an object');
        }
      }
    : (keyOrParState, value = didNotPassValue) => {
        if (
          Object.prototype.toString.call(keyOrParState) === '[object Object]'
        ) {
          const parState = keyOrParState;
          state = deepMerge(state, parState);
        } else if (typeof keyOrParState === 'string') {
          if (value === didNotPassValue) {
            throw new Error('no value provided');
          }
          const key = keyOrParState;
          state[key] = value;
        } else {
          throw new TypeError('first argument is not a string or an object');
        }
      };

  const read = logging
    ? (key = didNotPassKey) => {
        if (key === didNotPassKey) {
          stateHistory.push({
            read: deepClone(state),
            location: calledFrom(),
          });
          return deepClone(state);
        }

        if (typeof key !== 'string') {
          throw new TypeError('key is not a string');
        }

        const readValue = state[key];
        stateHistory.push({
          read: key,
          value: deepClone(readValue),
          location: calledFrom(),
        });
        return deepClone(readValue);
      }
    : (key = didNotPassKey) => {
        if (key === didNotPassKey) {
          return deepClone(state);
        }

        if (typeof key !== 'string') {
          throw new TypeError('key is not a string');
        }

        const readValue = state[key];
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

  const log = logging
    ? (...logs) =>
        logs.length !== 0
          ? (stateHistory.push(
              deepClone({
                log: deepClone(logs),
                location: calledFrom(),
              })
            ),
            console.log(...logs))
          : (console.log(calledFrom(), history()),
            stateHistory.push(
              deepClone({
                log: history(),
                location: calledFrom(),
              })
            ))
    : console.log;

  return {
    read,
    write,
    log,
  };
};
