const express = require('express');
const router = express.Router();

FormResponse = require('../models/form_response');
QuestionResponse = require('../models/question_response');

function createFormResponse(req) {
    newForm = FormResponse();
    newForm.zip_code = '92617';
    console.log(newForm);
}

router.post("/", (req, res) => {
    // console.log(req.body)
    createFormResponse(req);
    res.status(201);
    console.log("POST /submitForm request (submit-form) | Status: " + res.statusCode);
    res.send();
});

module.exports = router;