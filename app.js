const express = require("express");
var mongoose = require("mongoose");

const mlab_db = "" // <-- insert mongoDB cluster key here

mongoose
  .connect(mlab_db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


//Load db_schema
const QuestionResponse = require("./db_schema/question_response");
const Student = require("./db_schema/student");


const app = express();

//API Methods:
//app.post()
//app.get() . . .