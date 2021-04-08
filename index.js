const express = require('express');
const app = express();
let port = process.env.PORT || 3000;
const importData = require('./data.json')
const careerQuestions = require('./models/questions.js')
const FormResponse = require('./models/form_response');
const QuestionResponse = require('./models/question_response');


const MongoClient = require('mongodb').MongoClient;
const { ObjectID } = require('bson');
db_name = 'submissions';
const uri = `mongodb+srv://jamesjellow:${process.env.ATLAS_PASSWORD}@cluster0.ksqzk.mongodb.net/${db_name}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  // try {
  //   await client.connect();
  //   const database = client.db('sample_mflix');
  //   const movies = database.collection('movies');
  //   // Query for a movie that has the title 'Back to the Future'
  //   const query = { title: 'Back to the Future' };
  //   const movie = await movies.findOne(query);
  //   await movies.find().forEach(console.dir);
  // } finally {
  //   // Ensures that the client will close when you finish/error
  //   await client.close();
  // }

  // Setter 
  try {
    await client.connect();
    const database = client.db('submissions');
    let col = database.collection('question_response');
    // form = new FormResponse({
    //   user: "helloworld",
    // })

    // questions = [ ]
    // question = new QuestionResponse({
    //   industry: "Health",
    //   skill: "Caring",
    //   score: 1,
    //   submission_id: form
    // })
    // form.response_ids.push(question);
    // // questions.push(question)
    
    // await col.insertMany(form.response_ids);
    // // const newForm = new FormResponse();
    // col = database.collection('form_response');
    
    // await col.insertOne(form);
    // const p = await col.insertOne(newForm);
    // const qr = await col.findOne({industry : "Health"});
    // console.log(qr._id)
    // col = database.collection('form_response');
    // const form = await col.findOne({_id: qr.submission_id});
    // console.log(form);

    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
  }

  // Getter
  // try {
  //   await client.connect();
  //   const database = client.db('submissions');
  //   const movies = database.collection('form_response');
  //   const query = {};
  //   const results = await movies.find(query).toArray();
  //   // console.log(results.length);
  //   // let results = []
  //   // const cursor = await movies.find({user : "jamesjellow"});
  //   // const count = await cursor.count();
  //   // console.log(count);
  // } finally {
  //   // Ensures that the client will close when you finish/error
  //   await client.close();
  // }
}
run().catch(console.dir);

// console.log(careerQuestions)
// app.get('/', (req, res) => {
//     res.send(careerQuestions)
//     // res.send('Hello World');
// })

// app.get('/players', (req, res) => {
//     res.send(importData);
// })

// app.listen(port, () => {
//     console.log(`Example app is listening on port http://localhost:${port}`)
// })