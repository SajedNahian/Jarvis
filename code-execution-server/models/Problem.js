const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: String,
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard']
  },
  startingCode: [String],
  description: {
    type: String
  },
  solution: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Problem', problemSchema);
