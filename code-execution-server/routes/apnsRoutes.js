const express = require('express');
const router = express.Router();

const APNS = require('../models/APNS');

router.post('/', async (req, res) => {
  const { token } = req.body;
  let apns = await APNS.findOne({ token });
  if (apns) {
    return res.json({
      status: true,
      result: 'APNS already registered'
    });
  }
  console.log(token);
  apns = new APNS({ token });
  await apns.save();
  return res.json({
    success: true,
    result: 'Created APNS'
  });
});

module.exports = router;
