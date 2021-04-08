const express = require("express");
var mongoose = require("mongoose");
const methodOveride = require("method-override");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("./config/keys");
const passport = require("passport");
const cors = require("cors");
const fs = require('fs');
const mlab_db = "mongodb+srv://<username>:<password>@cluster0.ksqzk.mongodb.net/journeymxn?retryWrites=true&w=majority"
const LocalStrategy = require('passport-local').Strategy;

mongoose
  .connect(mlab_db, {useNewUrlParser:true, useUnifiedTopology: true})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


//Load db_schema
// const QuestionResponse = require("./db_schema/question_response");
// const Student = require("./db_schema/student");
const Admin = require("./db_schema/admin")

//Load Login Validation
const validateLoginInput = require("./validation/login");

//Load Express
var app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(methodOveride("_method"));
//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(passport.initialize());
passport.use(new LocalStrategy(function(email, password, done) {
  Admin.findOne({email: email}, (err, admin) =>{
    console.log(email, ' tried to log in');
    
    if(err) return done(err);
    if(!admin) return done(null, false);
    if(!password) return done(null, false);
    return done(null, admin)
  });
}));

//Passport config
require("./config/passport")(passport);

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});


app.get('/', function (req, res) {
  res.send('Hello World! GET request to the homepage')
})

app.post('/', function (req, res) {
  res.send('Hello World! POST request to the homepage')
})

app.get("/login",(req, res) => {
    res.send("Login Page: Redirection successful!");
  }
);

app.post("/login", passport.authenticate('local', 
  { successRedirect: '/admin', failureRedirect: '/login' }),
  (req, res) => {
  res.send("Login successful!!");
});

//PRIVATE ROUTE
app.get("/admin",(req, res) => {
    res.send( "Admin Page: Authorized Access Only");
    // Confirm current session for the user using "expressSession"
});

app.listen(3000, function() {
  console.log("Listening on Port 3000.")
})
