/* eslint-disable no-console */
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

const DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'oboeru';
const COLLECTION_NAME = 'users';
const NUM_SALT_ROUNDS = 10;

const connectRunClose = async (fn) => {
  let client;
  let result;

  try {
    // noinspection JSCheckFunctionSignatures, because WebStorm doesn't know about useNewUrlParser.
    client = await MongoClient.connect(DB_URL, { useNewUrlParser: true });
    console.log(`Opened connection to ${DB_URL}`);
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
    result = await fn(collection);
  } catch (err) {
    console.error(err);
  }

  if (client) {
    client.close();
    console.log(`Closed connection to ${DB_URL}`);
  }

  return result;
};

const add = async ({ username, password }) => {
  await connectRunClose(async (collection) => {
    const passwordHash = bcrypt.hashSync(password, NUM_SALT_ROUNDS);
    await collection.insertOne({ username, passwordHash });
    console.log(`Added user: ${username}`);
    console.log(`Password hash: ${passwordHash}`);
  });
};

const removeAll = async () => {
  await connectRunClose(async (collection) => {
    await collection.drop();
  });
};

const get = ({ username }) => connectRunClose(collection => collection.findOne({ username }));

module.exports = {
  add,
  removeAll,
  get,
};
