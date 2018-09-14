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
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
    result = await fn(collection);
  } catch (err) {
    console.error(err);
  }

  if (client) {
    client.close();
  }

  return result;
};

const add = ({ username, password }) => {
  const passwordHash = bcrypt.hashSync(password, NUM_SALT_ROUNDS);
  return connectRunClose(collection => collection.insertOne({ username, passwordHash }));
};

const getAll = () => connectRunClose(collection => collection.find({}).toArray());

const removeAll = () => connectRunClose(collection => collection.drop());

const isAuthentic = async ({ username, password }) => {
  const user = await connectRunClose(collection => collection.findOne({ username }));
  if (!user) {
    return false;
  }
  return bcrypt.compareSync(password, user.passwordHash);
};

module.exports = {
  add,
  getAll,
  removeAll,
  isAuthentic,
};
