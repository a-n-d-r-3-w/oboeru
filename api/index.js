const app = require('express')();
const bodyParser = require('body-parser');
const users = require('./db/users');

app.use(bodyParser.json());

app.post('/api/users', async (req, res) => {
  const { username, password } = req.body;
  try {
    await users.add({ username, password });
    res.end();
  } catch (error) {
    res.status(400).end();
  }
});

app.get('/api/users', async (req, res) => {
  const { username, password } = req.body;
  try {
    const isAuthentic = await users.isAuthentic({ username, password });
    res.json({ isAuthentic });
  } catch (error) {
    res.status(400).end();
  }
});

const server = app.listen(3000);

module.exports = server;
