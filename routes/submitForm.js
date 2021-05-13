// /routes/submitForm.js 
// Creates and Submits a form to the MongoDB Database
// Makes career recommendations and emails them to users

const express = require('express');
const router = express.Router();

FormResponse = require('../models/form_response');
QuestionResponse = require('../models/question_response');
const { connectToMongoDB } = require('../helpers/mongo.js');
const recommendCareers = require('../helpers/recommendationAlgo')

router.post("/", (req, res) => {
    main(req, res)
});

async function emailRecommendations(careerRecommendations) {
    return null;
}

async function main(req, res) {

    try {
        // Connect to MongoDB
        client = await connectToMongoDB();
        db = client.db('submissions');
        form_response = db.collection('form_response');
        question_response = db.collection('question_response');
        
        form_response.drop();
        question_response.drop();    

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

        // Generate Recommendations
        const careerRecommendations = await recommendCareers(question_responses);
        console.log(careerRecommendations);

        // Send OK response
        res.status(201);
        res.send("Form Submitted!");
        console.log("POST /submitForm request (submit-form) | Status: " + res.statusCode);
        
        return newForm._id
    } catch (e) {
        res.status(500)
        res.send("Form Submission Failed :(");
        console.error(e);
    }
}

module.exports = router;