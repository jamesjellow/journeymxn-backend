const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FormResponse = new Schema({
    emailto : String,
    state : String,
    school_district : String, 
    school_name: String,
    reccomendations: String,
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