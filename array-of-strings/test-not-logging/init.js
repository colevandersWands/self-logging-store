import { createStore } from '../logging-store/index.js';

// functions API
const { read, write, log } = createStore(
  {
    tree: [1, 2, 3],
  },
  false
);

export { read, write, log };
