const express = require('express');
const app = express();
let port = process.env.PORT || 3000;
const importData = require('./data.json')
const careerQuestions = require('./models/questions.js')

// console.log(careerQuestions)
app.get('/', (req, res) => {
    res.send(careerQuestions)
    // res.send('Hello World');
})

app.get('/players', (req, res) => {
    res.send(importData);
})

app.listen(port, () => {
    console.log(`Example app is listening on port http://localhost:${port}`)
})