// imported

import { read, write, log } from './init.js';

import './other.js';

console.log(read('string'));
read('number');
read('boolean');
read('array');
try {
  read('asdf');
} catch (err) {
  console.error(err);
}

write('object', { a: 1 });
write('array', [1]);
write('symbol', Symbol());
write('number', 0);
write('set', new Set());
try {
  write('asdf');
} catch (err) {
  console.error(err);
}
try {
  write('string', 4);
} catch (err) {
  console.error(err);
}
try {
  write('map', 4);
} catch (err) {
  console.error(err);
}

log('index');
