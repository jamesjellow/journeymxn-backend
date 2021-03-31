const express = require('express');
const app = express();
let port = process.env.PORT || 3000;
const importData = require('./data.json')
const careerQuestions = require('./models/questions.js')

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://jamesjellow:${process.env.ATLAS_PASSWORD}@cluster0.pyyja.mongodb.net?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');
    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);
    await movies.find().forEach(console.dir);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
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