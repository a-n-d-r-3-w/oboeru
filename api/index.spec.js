/* globals afterEach, beforeEach, describe, expect, test */
/* eslint-disable global-require */
// This test requires the Express server to be running.
const request = require('supertest');
const users = require('./db/users');

const getNumUsers = async () => (await users.getAll()).length;

let server;

beforeEach(async () => {
  server = require('./index');

  const numUsers = await getNumUsers();
  if (numUsers === 0) {
    return;
  }
  await users.removeAll();
  expect(await getNumUsers()).toBe(0);
});

afterEach(async () => {
  server.close();
});

describe('Add user', () => {
  test('Happy path', async () => {
    const response = await request(server)
      .post('/api/users')
      .send({ username: 'optimus', password: '0p+1mu$' });
    expect(response.status).toBe(200);
  });

  test('Missing password', async () => {
    const response = await request(server)
      .post('/api/users')
      .send({ username: 'optimus' });
    expect(response.status).toBe(400);
  });

  test('Missing username', async () => {
    const response = await request(server)
      .post('/api/users')
      .send({ password: '0p+1mu$' });
    expect(response.status).toBe(400);
  });
});

describe('Authenticate user', () => {
  beforeEach(async () => {
    await users.add({ username: 'optimus', password: '0p+1mu$' });
  });

  test('Happy path', async () => {
    const response = await request(server)
      .get('/api/users')
      .send({ username: 'optimus', password: '0p+1mu$' });
    expect(response.status).toBe(200);
    const { isAuthentic } = JSON.parse(response.text);
    expect(isAuthentic).toBe(true);
  });

  test('Missing password', async () => {
    const response = await request(server)
      .get('/api/users')
      .send({ username: 'optimus' });
    expect(response.status).toBe(400);
  });

  test('Missing username', async () => {
    const response = await request(server)
      .get('/api/users')
      .send({ password: '0p+1mu$' });
    expect(response.status).toBe(400);
  });

  test('Wrong password', async () => {
    const response = await request(server)
      .get('/api/users')
      .send({ username: 'optimus', password: 'Wrong password' });
    expect(response.status).toBe(200);
    const { isAuthentic } = JSON.parse(response.text);
    expect(isAuthentic).toBe(false);
  });

  test('Wrong username', async () => {
    const response = await request(server)
      .get('/api/users')
      .send({ username: 'Wrong username', password: '0p+1mu$' });
    expect(response.status).toBe(200);
    const { isAuthentic } = JSON.parse(response.text);
    expect(isAuthentic).toBe(false);
  });
});
