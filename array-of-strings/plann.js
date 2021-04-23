/*
  this api is cleaner and has less room for syntax errors than parstate

  it doesn't exist yet but will work like this:
*/

read('key'); // read a top-level value

read(['key', 'key']); // read arbitrarily nested values
// will throw normal errors if keys don't exist
//  a for-of loop that accesses next depth with bracket notation

write('key', 'value'); // write a single top-level value

write(['key', 'key'], 'value'); // write to nested keys
//  errors will be like with write
