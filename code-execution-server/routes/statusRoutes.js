const express = require('express');
const axios = require('axios');

const router = express.Router();
// Models
const Visited = require('../models/Visted');

router.get('/', async (req, res) => {
  try {
    const result = await axios.post(
      `http://${process.env.CODE_RUNNER_IP}:5000/`
    );

    res.json({
      success: true,
      message: 'Everything looks to be up.',
      data: result.data
    });
  } catch (err) {
    console.log(err);
  }
});

router.get('/mongodb', async (req, res) => {
  const visited = await Visited.find();
  res.json(visited);
  const newVisit = new Visited();
  newVisit.save();
});

module.exports = router;
