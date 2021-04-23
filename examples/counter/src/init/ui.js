import { main } from '../components/main.js';
import { log } from './store.js';

const app = main();

document.getElementById('root').appendChild(app);

const logTheLogs = () => log();
document.getElementById('log-the-logs').onclick = logTheLogs;
