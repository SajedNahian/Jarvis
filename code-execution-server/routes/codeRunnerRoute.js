const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.send('Run code');
});

module.exports = router;
