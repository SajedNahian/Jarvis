const express = require('express');
const axios = require('axios');

const router = express.Router();

const Runner = require('../models/Runner');

router.post('/', async (req, res) => {
  const { language, code, id } = req.body;
  if (['javascript', 'python', 'java'].includes(language)) {
    const runner = await Runner.findOne({ problem: id, language });

    if (!runner)
      return res.json({
        success: false,
        message: 'Could not find runner file'
      });

    const result = await axios.post(
      `http://${process.env.CODE_RUNNER_IP}:5000`,
      {
        language,
        code,
        runnerCode: runner.code
      }
    );
    const success = result.data.stderr == '';
    res.json({
      success,
      ...result.data
    });
  } else {
    res.json({
      success: false,
      message: 'Not a valid language',
      stdout: '',
      stderr: ''
    });
  }
});

module.exports = router;
