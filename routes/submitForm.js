// /routes/submitForm.js 
// Creates and Submits a form to the MongoDB Database

const express = require('express');
const router = express.Router();

FormResponse = require('../models/form_response');
QuestionResponse = require('../models/question_response');
const { connectToMongoDB } = require('../helpers/mongo.js');

async function createFormResponse(req) {

    // Connect to MongoDB
    client = await connectToMongoDB();
    db = client.db('submissions');
    form_response = db.collection('form_response');
    question_response = db.collection('question_response');

    // Create the Form
    newForm = FormResponse({
        emailto: req.body.emailto,
        state: req.body.state,
        school_district: req.body.school_district,
        school_name: req.body.school_name,
    });

    // Create the Question Responses
    question_responses = [ ]
    for (const q of req.body.responses) {
        r = new QuestionResponse({
            industry: q.industry,
            skill : q.skill,
            score : q.score,
            submission_id : newForm._id
        });
        question_responses.push(r);
    }

    newForm.responses = question_responses;
    
    // Insert them into the database
    form_response.insertOne(newForm);
    question_response.insertMany(question_responses);

}

router.post("/", (req, res) => {
    // console.log(req.body)
    try {
        createFormResponse(req);
        console.log("POST /submitForm request (submit-form) | Status: " + res.statusCode);
    } catch (e) {
        console.error(e);
        res.send(500)
        res.send("Form Submission Failed :(");
    } finally {
        res.status(201);
        res.send("Form Submitted!");
    }
});

module.exports = router;