const { MongoClient } = require('mongodb');
const assert = require('assert');
const bcrypt = require('bcrypt');

const COLLECTION_NAME = 'users';
const DB_NAME = 'oboeru';
const NUM_SALT_ROUNDS = 10;

const dropCollection = async (db) => {
  const collection = db.collection(COLLECTION_NAME);
  await collection.drop();
};

const insertDocuments = async (db) => {
  const collection = db.collection(COLLECTION_NAME);
  const result = await collection.insertMany([
    { username: 'wolfwire', passwordHash: bcrypt.hashSync('w01fw1r3', NUM_SALT_ROUNDS) },
    { username: 'brainstorm', passwordHash: bcrypt.hashSync('br@in$+0rm', NUM_SALT_ROUNDS) },
  ]);
  assert.equal(2, result.result.n);
  assert.equal(2, result.ops.length);
  console.log('Inserted 3 documents into the collection');
};

const findDocuments = async (db) => {
  const collection = db.collection(COLLECTION_NAME);
  const documents = await collection.find({}).toArray();
  console.log(documents);
};

(async () => {
  const url = 'mongodb://localhost:27017';
  let client;

  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true });
    console.log('Opened connection to mongodb');
    const db = client.db(DB_NAME);
    await dropCollection(db);
    await insertDocuments(db);
    await findDocuments(db);
  } catch (err) {
    console.log(err.stack);
  }

  if (client) {
    client.close();
    console.log('Closed connection to mongodb');
  }
})();
