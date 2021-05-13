// /routes/submitForm.js 
// Creates and Submits a form to the MongoDB Database
// Makes career recommendations and emails them to users

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

FormResponse = require('../models/form_response');
QuestionResponse = require('../models/question_response');
const { connectToMongoDB } = require('../helpers/mongo.js');
const recommendCareers = require('../helpers/recommendationAlgo')

router.post("/", (req, res) => {
    main(req, res)
});

async function emailRecommendations(careerRecommendations, emailto) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'noreplyjourneymxnbot@gmail.com',
            pass: process.env.EMAIL_PASS
        }
    });

    let body = "Thank you for taking the Journeymxn Quiz,\n\nHere are your results:\n\n"
    for ( score of careerRecommendations) {
        if (parseInt(score.key, 10) >= 0) 
            body += ' '
        body += `${score.key} : ${score.values.join(", ")}\n`
        // console.log(score)
        // score
    }
    body += "\n\n*Note: Higher scores indicate a better career fit. Lower scores indicate careers you would likely not enjoy."
    const mailOptions = {
        from: 'noreplyjourneymxnbot@gmail.com',
        to: emailto,
        subject: 'Journeymxn Quiz Results',
        text: body
    };

    // console.log(body)
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
    
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
        // console.log(careerRecommendations);

        // Email Recommendations
        emailRecommendations(careerRecommendations, newForm.emailto);

        // Send OK response
        res.status(201);
        res.send("Form Submitted!");
        console.log("POST /submitForm request (submit-form) | Status: " + res.statusCode);
        
    } catch (e) {
        res.status(500)
        res.send("Form Submission Failed :(");
        console.error(e);
    }
}

module.exports = router;