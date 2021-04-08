const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FormResponse = new Schema({

    dateSubmitted : {
      type: Date, 
      required: true,
      default: Date.now()
    },
  
    user: { type: String, required: true},

    // 1 : M
    response_ids: [{ type: Schema.Types.ObjectId, ref: 'QuestionResponse' }]
  },
  { collection: 'form_response' }
  );

module.exports = mongoose.model('FormResponse', FormResponse);