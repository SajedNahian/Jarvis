const express = require('express');
const Problem = require('../models/Problem');

const router = express.Router();

const sortingOrder = {
  Easy: 1,
  Medium: 2,
  Hard: 3
};

router.get('/', async (req, res) => {
  const problems = await Problem.find();
  problems.sort(
    (a, b) => sortingOrder[a.difficulty] - sortingOrder[b.difficulty]
  );
  res.json({
    problems
  });
});

module.exports = router;
