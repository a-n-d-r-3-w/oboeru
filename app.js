const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

(async () => {
  const url = 'mongodb://localhost:27017';
  const dbName = 'oboeru';
  let client;

  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true });
    console.log('Opened connection to mongodb');
    const db = client.db(dbName);
  } catch (err) {
    console.log(err.stack);
  }
  
  if (client) {
    client.close();
    console.log('Closed connection to mongodb')
  }
})();
