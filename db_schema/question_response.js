const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const QuestionResponseSchema = new Schema({
  industry: {
    type: String,
  },
  skill: {
    type: String,
  },
  score: {
    type: Number,
  }
});

module.exports = QuestionResponse = mongoose.model('QuestionResponse', QuestionResponseSchema);