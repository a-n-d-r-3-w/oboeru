/* eslint-disable no-console */
const users = require('./users');

(async () => {
  await users.removeAll();
  await users.add({ username: 'wolfwire', password: 'w01fw1r3' });
  await users.add({ username: 'brainstorm', password: 'br@1n$+0rm' });
  const user1 = await users.get({ username: 'wolfwire' });
  console.log(user1);
  const user2 = await users.get({ username: 'brainstorm' });
  console.log(user2);
})();
