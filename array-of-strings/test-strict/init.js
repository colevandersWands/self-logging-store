import { createStore } from '../logging-store/index.js';

// functions API
const { read, write, log } = createStore({
  string: '',
  number: 0,
  boolean: true,
  array: [],
  object: {},
  symbol: Symbol(),
  function: () => {},
  null: null,
  undefined: undefined,
  set: new Set(),
  map: new Map(),
  date: new Date(),
});

export { read, write, log };
