const express = require('express');
const app = express();

app.post('/', (req, res) => {
  res.send('Nice');
});

app.listen(5000, () => {
  console.log('code-runner instance started...');
});
