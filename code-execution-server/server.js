const express = require('express');
const app = express();
const connectDb = require('./utils/db');

const cors = require('cors');
app.use(express.json());
app.use(cors());

// Routes
app.use('/status', require('./routes/statusRoutes'));
app.use('/runCode', require('./routes/codeRunnerRoute'));
app.use('/problems', require('./routes/problemsRouter'));
app.use('/registerToken', require('./routes/apnsRoutes'));

// Starting up server
connectDb();

app.listen(5000, () => {
  console.log('Code Execution Server: Started on port 5000...');
});
