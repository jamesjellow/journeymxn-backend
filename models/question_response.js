const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionResponseSchema = new Schema({
  industry: {
    type: String,
    required: true
  },

  // Ask Mugdhaa
  // subindustry: {
  //   type: String,
  //   required: false
  // },
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
    type: Schema.Types.ObjectId,
    ref: "FormResponse"
  }
  
}, { collection: 'question_response' });

module.exports = mongoose.model('QuestionResponseSchema', QuestionResponseSchema);