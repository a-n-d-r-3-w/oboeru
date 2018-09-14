/* globals afterEach, beforeEach, describe, expect, test */
/* eslint-disable global-require */
// This test requires the Express server to be running.
const request = require('supertest');

let server;

beforeEach(async () => {
  server = require('./index');
});

afterEach(async () => {
  server.close();
});

describe('Add user', () => {
  test('Happy path', async () => {
    const response = await request(server)
      .put('/api/users')
      .send({ username: 'optimus', password: '0p+1mu$' });
    expect(response.status).toBe(200);
  });

  test('Missing password', async () => {
    const response = await request(server)
      .put('/api/users')
      .send({ username: 'optimus' });
    expect(response.status).toBe(400);
  });

  test('Missing username', async () => {
    const response = await request(server)
      .put('/api/users')
      .send({ password: '0p+1mu$' });
    expect(response.status).toBe(400);
  });
});
