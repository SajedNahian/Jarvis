const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.get('/status', (req, res) => {
  res.send('Looks like server is up');
});

app.listen(5000, () => {
  console.log('Code Execution Server: Started on port 5000');
});
