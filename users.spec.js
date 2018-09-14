/* globals beforeEach, describe, expect, test */
// This test requires mongod to be running in the background.
const users = require('./users');

const getNumUsers = async () => (await users.getAll()).length;

beforeEach(async () => {
  const numUsers = await getNumUsers();
  if (numUsers === 0) {
    return;
  }
  await users.removeAll();
  expect(await getNumUsers()).toBe(0);
});

test('add', async () => {
  await users.add({ username: 'optimus', password: '0p+1mu$' });
  expect(await getNumUsers()).toBe(1);
  await users.add({ username: 'rodimus', password: 'r0d1mu$' });
  expect(await getNumUsers()).toBe(2);
});

test('getAll', async () => {
  await users.add({ username: 'optimus', password: '0p+1mu$' });
  await users.add({ username: 'rodimus', password: 'r0d1mu$' });
  expect(await getNumUsers()).toBe(2);
  const allUsers = await users.getAll();
  expect(allUsers[0].username).toBe('optimus');
  expect(allUsers[0].passwordHash).toEqual(expect.any(String));
  expect(allUsers[1].username).toBe('rodimus');
  expect(allUsers[1].passwordHash).toEqual(expect.any(String));
});

describe('isAuthentic', async () => {
  beforeEach(async () => {
    await users.add({ username: 'optimus', password: '0p+1mu$' });
  });

  test('correct username and password', async () => {
    const isAuthentic = await users.isAuthentic({
      username: 'optimus',
      password: '0p+1mu$',
    });
    expect(isAuthentic).toBe(true);
  });

  test('wrong username', async () => {
    const isAuthentic = await users.isAuthentic({
      username: 'wrong username',
      password: '0p+1mu$',
    });
    expect(isAuthentic).toBe(false);
  });

  test('wrong password', async () => {
    const isAuthentic = await users.isAuthentic({
      username: 'optimus',
      password: 'wrong password',
    });
    expect(isAuthentic).toBe(false);
  });
});
