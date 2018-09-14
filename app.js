/* eslint-disable no-console */
const assert = require('assert');
const users = require('./users');

(async () => {
  // Clear database
  await users.removeAll();

  // Add users
  await users.add({
    username: 'wolfwire',
    password: 'w01fw1r3',
  });
  await users.add({
    username: 'brainstorm',
    password: 'br@1n$+0rm',
  });

  // Exercise isAuthentic
  assert(await users.isAuthentic({
    username: 'wolfwire',
    password: 'w01fw1r3',
  }));
  assert(!await users.isAuthentic({
    username: 'brainstorm',
    password: 'wrong password',
  }));
})();
