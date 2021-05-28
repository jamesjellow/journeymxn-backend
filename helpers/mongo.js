// helpers/mongo.js
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const uri = process.env.URI;
// update heroku env uri
// const uri = "mongodb+srv://jamesjellow:L0PIohkTrhVYjgAc@cluster0.ksqzk.mongodb.net/users?retryWrites=true&w=majority"
// Returns the database that it connected to
async function connectToMongoDB(database = "users") {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    return await client.connect()
};

async function mongooseConnect() {
    await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
};

module.exports.connectToMongoDB = connectToMongoDB;
module.exports.mongooseConnect = mongooseConnect;
