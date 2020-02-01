const express = require('express');
const fs = require('fs');
const { spawn } = require('child_process');

const app = express();

app.post('/', (req, res) => {
  const { language, code } = req.body;
  fs.writeFile('file.py', code, err => {
    if (err) throw err;
    let stdout = '';
    let stderr = '';

    let child = spawn('python3', ['file.py']);

    setTimeout(() => {
      res.json({
        message: 'Code took too long to run',
        stdout,
        stderr
      });
      process.exit(1);
    }, 7000);

    child.stderr.on('data', data => {
      stderr += data.toString();
    });

    child.stdout.on('data', data => {
      stdout += data.toString();
    });

    child.addListener('close', () => {
      res.json({
        message: '',
        stdout,
        stderr
      });
      process.exit(1);
    });
  });
});

app.listen(5000, () => {
  console.log('code-runner instance started...');
});
