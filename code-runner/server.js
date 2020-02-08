const express = require('express');
const fs = require('fs');
const { spawn, exec, execSync } = require('child_process');

const app = express();

app.use(express.json());

const extension = {
  python: 'py',
  javascript: 'js',
  java: 'java'
};

const createSpawnProcess = language => {
  switch (language) {
    case 'python':
      return spawn('python3', ['Runner.py']);
    case 'javascript':
      return spawn('node', ['Runner.js']);
    case 'java':
      return spawn('java', ['-ea', 'Runner']);
  }
};

const isCompiledLanguage = language => {
  return ['java'].includes(language);
};

const prepareCompiledLanguage = (
  req,
  res,
  { runnerCode, code, language },
  cb
) => {
  if (runnerCode.includes('import')) {
    res.json({
      message: 'Redundant import statement',
      stdout: '',
      stderr:
        'All the data structures and algorithms libraries have already been imported. Please remove your import statement.'
    });
  }
  fs.writeFile(
    `Runner.java`,
    `import java.util.*; public class Runner { \n ${runnerCode} \n}`,
    err => {
      if (err) throw err;
      fs.writeFile(
        `Solution.java`,
        `import java.util.*; public class Solution { \n ${code} \n}`,
        err => {
          exec(`javac Runner.java`, (error, stdout, stderr) => {
            if (!error) {
              cb();
            } else {
              res.json({
                message: 'Code could not compile',
                stdout,
                stderr
              });
              process.exit(1);
            }
          });
        }
      );
    }
  );
};

const prepareNonCompiledLanguage = (
  req,
  res,
  { runnerCode, code, language },
  cb
) => {
  fs.writeFile(
    `Runner.${extension[language]}`,
    code + '\n' + runnerCode,
    err => {
      if (err) throw err;
      cb();
    }
  );
};

app.post('/', (req, res) => {
  const { runnerCode, code, language } = req.body;
  if (isCompiledLanguage(language)) {
    prepareCompiledLanguage(req, res, { runnerCode, code, language }, () =>
      runCode(language, res)
    );
  } else {
    prepareNonCompiledLanguage(req, res, { runnerCode, code, language }, () =>
      runCode(language, res)
    );
  }
});

const runCode = (language, res) => {
  let stdout = '';
  let stderr = '';
  let stdoutLen = 0;
  let stderrLen = 0;

  let child = createSpawnProcess(language);
  let sentResponse = false;

  setTimeout(() => {
    child.kill('SIGINT');
    if (!sentResponse) {
      sentResponse = true;
      console.log('Code took too long');
      // console.log()
      res.json({
        message: 'Code took too long to run',
        stdout,
        stderr: 'Code took too long to run. \n' + stderr
      });
      process.exit(1);
    }
  }, 7000);

  child.stderr.on('data', data => {
    if (stderrLen < 200) {
      const errString = data.toString();
      stderr += errString;
      stderrLen += errString.length;
      if (stderrLen >= 200) {
        stderr += '...';
      }
    }
  });

  child.stdout.on('data', data => {
    if (stdoutLen < 200) {
      const outString = data.toString();
      stdout += outString;
      stdoutLen += outString.length;
      if (stdoutLen >= 200) {
        stdout += '...';
      }
    }
  });

  child.addListener('close', () => {
    if (!sentResponse) {
      res.json({
        message: '',
        stdout,
        stderr
      });
      process.exit(1);
    }
  });
};

app.listen(5000, () => {
  console.log('code-runner instance started...');
});

// For future reference if wanting to limit code cpu
// resources:
// requests:
//   memory: '128Mi'
//   cpu: '100m'
// limits:
//   memory: '256Mi'
//   cpu: '200m'
