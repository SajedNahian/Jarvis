const express = require('express');
const router = express.Router();

// Models
const Visited = require('../models/Visted');

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Everything looks to be up.'
  });
});

router.get('/mongodb', async (req, res) => {
  const visited = await Visited.find();
  res.json(visited);
  const newVisit = new Visited();
  newVisit.save();
});

module.exports = router;
