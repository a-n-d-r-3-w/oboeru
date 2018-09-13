const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const COLLECTION_NAME = 'users';
const DB_NAME = 'oboeru';

const insertDocuments = async db => {
  const collection = db.collection(COLLECTION_NAME);
  const result = await collection.insertMany([
    { username: 'wolfwire', passwordHash: 'w01fw1r3' },
    { username: 'brainstorm', passwordHash: 'br@in$+0rm' },
  ]);
  assert.equal(3, result.result.n)
  assert.equal(3, result.ops.length)
  console.log('Inserted 3 documents into the collection')
};

const findDocuments = async db => {
  const collection = db.collection(COLLECTION_NAME);
  const documents = await collection.find({}).toArray();
  console.log(documents)
};

(async () => {
  const url = 'mongodb://localhost:27017';
  let client;

  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true });
    console.log('Opened connection to mongodb');
    const db = client.db(DB_NAME);
    insertDocuments(db);
    findDocuments(db);
  } catch (err) {
    console.log(err.stack);
  }
  
  if (client) {
    client.close();
    console.log('Closed connection to mongodb')
  }
})();
