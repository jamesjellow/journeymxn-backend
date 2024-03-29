const randomEmail = require('random-email');

// Run node generateForm.js to create a form response

FormResponse = require('./models/form_response')
QuestionResponse = require('./models/question_response');

function generateResponses(form_id) {
    responses = [];
    industries = require('./sampleJSONs/industries.json')
    for (const [industry, values] of Object.entries(industries)) {
        for (value of values) {
            // console.log(value);
            response = {
                industry: industry,
                skill : value,
                score: getRandomIntInclusive(-1,1),
            }
            responses.push(response);
        }
    }

    // console.log(responses);
    return responses;
    
};

// Healthcare Decision Making -> Quick Thinking
// Consistency and Error Checking
// Technology Fanatic 

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function generateForms(numberOfForms = 1) {
    // Dumps a json object in /sampleJSONs

    let schools = [
        "Edison High",
        "Fountain Valley High",
        "Huntington Beach High",
        "Marina High",
        "Ocean View High",
        "Westminster High",
        "Valley Vista High (Continuation)",
        "Coast High"
    ]
    for (let i = 0; i < numberOfForms; i++) {
        form = {
            emailto: randomEmail(),
            state : 'CA',
            school_district : "Huntington Beach Union High",
            school_name : schools[getRandomIntInclusive(0, schools.length -1 )]
        }
        responses = generateResponses(form._id);
        form.responses = responses;
        
        const fs = require('fs')
        fs.writeFileSync(`./sampleJSONs/${i}.json`, JSON.stringify(form, null, 4), (err) => {
            console.log('Dumped news bits to file');
        });
    }
}

// Specify how many forms you want to make
// node generateForm.js
generateForms(3);

const questions = require('./sampleJSONs/questions.json')
