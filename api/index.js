const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.put('/api/users', (req, res) => {
  res.json(req.body);
});

const server = app.listen(3000);

module.exports = server;
