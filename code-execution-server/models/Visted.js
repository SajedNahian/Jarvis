const mongoose = require('mongoose');

const visitedSchema = new mongoose.Schema({
  time: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Visited', visitedSchema);
