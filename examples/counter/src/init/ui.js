import { log, read } from './store.js';

import '../listeners/up.js';
import '../listeners/down.js';

const initialLevel = read('level');

const numberEl = document.getElementById('the-number');
numberEl.innerHTML = initialLevel;
numberEl.className =
  initialLevel <= 3 ? 'low' : initialLevel <= 7 ? 'medium' : 'high';

const logTheLogs = () => log();
document.getElementById('log-the-logs').onclick = logTheLogs;
