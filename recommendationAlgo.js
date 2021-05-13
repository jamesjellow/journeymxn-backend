const { default: Heap } = require("heap-js");
const FormResponseSchema = require("./models/form_response");
const QuestionResponseSchema = require("./models/question_response")


function recommendCareers(form_id){
    //Fetch all question responses from DB
    response_object = getStudentResponse(form_id)

    //Update ScoreBreakdownBySkill
    ScoreBreakdownBySkill = recordScoreBreakdown(response_object);

    //Add score tallies to MaxHeap and ScoreTally
    res = generateScoreTally(ScoreBreakdownBySkill)
    ScoreTally = res.ScoreTally
    IndustryScores = res.IndustryScores

    //Generate array of careers
    careers = []
    scoresByRank = new Map([...ScoreTally.entries()].sort((a, b) => b[0] - a[0]));
    for (let [key, value] of scoresByRank.entries()){
        curr = {}
        curr[key] = value
        careers.push(curr) 
    }
    return careers;   
}

function getStudentResponse(form_id) {
    FormResponseSchema.findOne({_id: form_id}).then((data) => {
        if (data !== null) {
            // console.log(data)
            student_response = []
            //Create the json object
            for (i=0; i< data.responses.length;i++){
                question_ID = data.responses[i];
                QuestionResponseSchema.findOne(qs_id).then((resp) => {
                    if (resp !== null){
                        //Make sure the form_id matches the submission_id of the QuestionResponse
                        if (resp.submission_id == form_id){
                            question_response = {"industry":resp.industry, "skill":resp.skill, "score":resp.score};
                            student_response.push(question_response);
                        }
                    }
                })
            }
        }
    });
    return student_response;
};


function recordScoreBreakdown(resp_obj){
    let store = new Map(); 
    for (i = 0; i < resp_obj.length; i++) {
        data = resp_obj[i]
        if (store.has(data.industry)){
            value = store.get(data.industry);
        }
        else{
            value = {"MediumAndHigh":0, "Low":0, "Tally":0}
        }
        //Update the hashmap with curr Score
        if (data.score == 0 || data.score == 1){
            value.MediumAndHigh += 1
        }
        else if (data.score == -1){
            value.Low += 1
        }
        value.Tally += data.score;
        store.set(data.industry, value)
    }
    return store;
}

function generateScoreTally(store){
    let scores = []
    let score_tally = new Map();
    for (let [key, value] of  store.entries()) {
        scores.push(value.Tally)
        if (score_tally.has(value.Tally)){
            currIndustries = score_tally.get(value.Tally);  
        }
        else{
            currIndustries = []
        }
        currIndustries.push(key);
        score_tally.set(value.Tally, currIndustries)
    }
    return {"ScoreTally":score_tally, "IndustryScores":scores}
}