import { main } from '../components/main.js';
import { log, read } from './store.js';

const initialLevel = read('level');
const app = main(initialLevel);

document.getElementById('root').appendChild(app);

const logTheLogs = () => log();
document.getElementById('log-the-logs').onclick = logTheLogs;
