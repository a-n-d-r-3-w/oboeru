const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

const DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'oboeru';
const COLLECTION_NAME = 'users';
const NUM_SALT_ROUNDS = 10;

const connectRunClose = async (fn) => {
  let client;

  try {
    client = await MongoClient.connect(DB_URL, { useNewUrlParser: true });
    console.log(`Opened connection to ${DB_URL}`);
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
    await fn(collection);
  } catch (err) {
    console.error(err);
  }

  if (client) {
    client.close();
    console.log(`Closed connection to ${DB_URL}`);
  }
};

const addUser = async ({ username, password }) => {
  await connectRunClose(async (collection) => {
    await collection.insertOne({
      username,
      passwordHash: bcrypt.hashSync(password, NUM_SALT_ROUNDS),
    });
    console.log(`Added user '${username}'`);
  });
};

const removeAllUsers = async () => {
  await connectRunClose(async (collection) => {
    await collection.drop();
  });
};

const users = async () => {
  await connectRunClose(async (collection) => {
    const documents = await collection.find({}).toArray();
    console.log(documents);
  });
};

(async () => {
  await removeAllUsers();
  await addUser({ username: 'wolfwire', password: 'w01fw1r3' });
  await users();
})();
