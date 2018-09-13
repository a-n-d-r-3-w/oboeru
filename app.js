/* eslint-disable no-console */
const assert = require('assert');
const bcrypt = require('bcrypt');
const users = require('./users');

(async () => {
  // Clear database
  await users.removeAll();

  // Add users
  await users.add({ username: 'wolfwire', password: 'w01fw1r3' });
  await users.add({ username: 'brainstorm', password: 'br@1n$+0rm' });

  // Check using valid password
  const wolfwire = await users.get({ username: 'wolfwire' });
  assert(bcrypt.compareSync('w01fw1r3', wolfwire.passwordHash));

  // Check using invalid password
  const brainstorm = await users.get({ username: 'brainstorm' });
  assert(!bcrypt.compareSync('wr0ng passw0rd', brainstorm.passwordHash));
})();
