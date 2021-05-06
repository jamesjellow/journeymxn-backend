// helpers/mongo.js
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const uri = "mongodb+srv://Mugdhaa-P:trN41Dhy46GLAiAH@cluster0.ksqzk.mongodb.net/users?retryWrites=true&w=majority";

// Returns the database that it connected to
async function connectToMongoDB(database = "users") {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db(database);
    console.log(`MongoDB Connected to ${db.namespace}`);
    return db;
};

async function mongooseConnect() {
    await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
};

module.exports.connectToMongoDB = connectToMongoDB;
module.exports.mongooseConnect = mongooseConnect;
