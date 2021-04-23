import { write, log } from './init.js';

write('asdf', 3);
log('other');

setTimeout(() => log(), 0);
