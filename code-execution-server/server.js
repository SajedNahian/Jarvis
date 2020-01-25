const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Server is up');
});

app.listen(5000, () => {
  console.log('Code Execution Server started on port 5000');
});
