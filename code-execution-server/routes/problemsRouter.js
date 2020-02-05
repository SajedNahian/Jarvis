const express = require('express');
const Problem = require('../models/Problem');

const router = express.Router();

const sortingOrder = {
  Easy: 1,
  Medium: 2,
  Hard: 3
};

const areSameDay = (d1, d2) => Math.abs(d2 - d1) <= 1000 * 60 * 60 * 24;

router.get('/', async (req, res) => {
  let problems = await Problem.find();

  problems.sort(
    (a, b) => sortingOrder[a.difficulty] - sortingOrder[b.difficulty]
  );

  problems = problems.map(problem => ({
    ...problem.toJSON(),
    createdToday: areSameDay(problem.createdAt, Date.now())
  }));

  res.json({
    problems
  });
});

module.exports = router;
