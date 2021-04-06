const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
{ Finance
  Frugality
  1
}
*/
const QuestionResponse = new Schema({
  industry: {
    type: String,
    required: true
  },
  skill: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    enum: [-1,0,1],
    required: true
  },
  submission_id: {
    type: ObjectId,
    ref: "FormResponse"
  }
  
}, { collection: 'question_response' });

module.exports = mongoose.model('QuestionResponse', QuestionResponse);