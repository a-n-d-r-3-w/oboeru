const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const insertDocuments = async db => {
  const collection = db.collection('collection');
  let result;
  try {
    result = await collection.insertMany([
      { a: 1 },
      { a: 2 },
      { a: 3 },
    ]);
    assert.equal(3, result.result.n)
    assert.equal(3, result.ops.length)
    console.log('Inserted 3 documents into the collection')
  } catch (err) {
    console.log(err.stack);
  }
}

(async () => {
  const url = 'mongodb://localhost:27017';
  const dbName = 'oboeru';
  let client;

  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true });
    console.log('Opened connection to mongodb');
    const db = client.db(dbName);
    insertDocuments(db);
  } catch (err) {
    console.log(err.stack);
  }
  
  if (client) {
    client.close();
    console.log('Closed connection to mongodb')
  }
})();
