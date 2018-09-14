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

test('smoke', async () => {
  const response = await request(server).get('/');
  expect(response.statusCode).toBe(200);
});
