const mongoose = require('mongoose');

const runnerSchema = new mongoose.Schema({
  problem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem'
  },
  code: {
    type: String
  },
  language: {
    type: String,
    default: 'java'
  }
});

module.exports = mongoose.model('Runner', runnerSchema);
