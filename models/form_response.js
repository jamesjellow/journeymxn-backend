const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FormResponse = new Schema({

    // user: { 
    //   type: Schema.Types.ObjectId, 
    //   required : false, 
    //   ref: 'UserSchema'
    // },
    emailto : String,
    zip_code : Number,
    school: String,
    reccomendation: String,
    dateSubmitted : {
      type: Date, 
      required: true,
      default: Date.now()
    },
    // 1 : M
    responses: [{ type: Schema.Types.ObjectId, ref: 'QuestionResponse' }]
  },
  { collection: 'form_response' }
  );

module.exports = mongoose.model('FormResponse', FormResponse);