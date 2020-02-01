const express = require('express');
const app = express();
const connectDb = require('./utils/db');

const cors = require('cors');
app.use(cors());

// Routes
app.use('/status', require('./routes/statusRoutes'));
app.use('/runCode', require('./routes/codeRunnerRoute'));

// Starting up server
connectDb();

app.listen(5000, () => {
  console.log('Code Execution Server: Started on port 5000...');
});
