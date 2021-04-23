import { createStore } from '../../../../parstate/logging-store/index.js';

import { state } from '../data.js';

const { read, write, log } = createStore(state);

export { read, write, log };
