const app = require('express')();
const bodyParser = require('body-parser');
const users = require('./db/users');

app.use(bodyParser.json());
app.put('/api/users', async (req, res) => {
  // const { username, password } = req.body;
  // await users.add({ username, password });
  res.json(req.body);
});

const server = app.listen(3000);

module.exports = server;
