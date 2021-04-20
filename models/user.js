const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// For now only admin can create accounts and login
const UserSchema = new Schema({
  // ID is autogenerated
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default : 'admin'
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now
  },
  quizResponses: 
  //Array of 'QuestionResponse' objects
  [{
    type: Schema.Types.ObjectId,
    ref: 'QuestionResponseSchema'
  }],
}, {collection: "users"});

module.exports = Student = mongoose.model('UserSchema', UserSchema);