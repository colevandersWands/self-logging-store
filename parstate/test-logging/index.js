// imported

import { read, write, log } from './init.js';

import './other.js';

log();
console.log(read('tree'));
write('oak', 1);
log();

write({ tree: [4] });
console.log(read());

const e = read('tree');
e.push(4);
write('tree', e);
console.log(read());
// console.log(history());
log('hello');

write({ moo: { cow: 'say' } });

console.log(read());

try {
  log(document.createElement('div'));
} catch (err) {
  // not in the browser
}

log([1, 2, 3]);

(function stacked() {
  log('hellee');
})();
// console.log(history(3));

log();

null();
