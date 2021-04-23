import { isPlainObject } from './is-plain-object.js';
import { didNotPassValue } from './did-not-pass-value.js';

export const validate = (state, key, value = didNotPassValue) => {
  if (typeof key !== 'string') {
    throw new TypeError('key is not a string');
  }
  if (!isPlainObject(state)) {
    throw new TypeError('state is not a plain object');
  }

  if (!Object.keys(state).includes(key)) {
    return new ReferenceError('state does not include key "' + key + '"');
  }

  if (value === didNotPassValue) {
    // if you made it here, the key is valid and there is no value to validate
    return true;
  }

  if (state[key] === null) {
    return value === null || new TypeError(`"${key}" should be null`);
  }

  if (typeof state[key] !== 'object') {
    return (
      typeof value === typeof state[key] ||
      new TypeError(`"${key}" should be a ${typeof state[key]}`)
    );
  }

  if (Array.isArray(state[key])) {
    return Array.isArray(value) || new TypeError(`"${key}" should be an array`);
  }

  if (isPlainObject(state[key])) {
    return (
      isPlainObject(value) || new TypeError(`"${key}" should be a plain object`)
    );
  }

  return (
    value.constructor.name === state[key].constructor.name ||
    new TypeError(`"${key}" should be a ${state[key].constructor.name}`)
  );
};
