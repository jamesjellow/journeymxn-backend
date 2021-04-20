const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const UserSchema = require('./user.js');

const adminSchema = new Schema({
  user: 
  //Array of 'QuestionResponse' objects
  {
    type: Schema.Types.ObjectId,
    ref: 'UserSchema'
  }
}, { collection: 'admin'} );

module.exports = Admin = mongoose.model('adminSchema', adminSchema);

