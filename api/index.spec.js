/* globals afterEach, beforeEach, expect, test */
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

test('PUT /api/users adds a user', async () => {
  const response = await request(server)
    .put('/api/users')
    .send({ username: 'optimus', password: '0p+1mu$' });
  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    username: 'optimus',
    password: '0p+1mu$',
  });
});
