const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  res.json({
    success: true,
    message: 'Everything looks to be up.'
  });
});

module.exports = router;
