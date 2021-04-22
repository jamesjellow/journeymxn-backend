// $ npm i bcryptjs body-parser cors fs jsonwebtoken method-override mongoose passport passport-jwt passport-local validator --save
// npm run dev
const express = require("express");
var mongoose = require("mongoose");
const methodOveride = require("method-override");
const passport = require("passport");
const cors = require("cors");
db_name = 'users';
user_name = 'jamesjellow'
const uri = `mongodb+srv://${user_name}:${process.env.ATLAS_PASSWORD}@cluster0.ksqzk.mongodb.net/${db_name}?retryWrites=true&w=majority`;
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

mongoose
  .connect(uri, {useNewUrlParser:true, useUnifiedTopology: true})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//Load db_schema
const UserSchema = require("./models/user")

//Load Express
var app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(methodOveride("_method"));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use(session({
  secret: 'veryimportantsecret',
  resave: true,
  saveUninitialized:true,
  cookie: {maxAge:300000} //5 minutes 
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
                                usernameField: 'email',
                                    passwordField: 'password'
                              }, 
            function(email, password, done) {
              UserSchema.findOne({email: email}, (err, user) =>{
                console.log(email, ' tried to log in!');
                //console.log(user);
                if(err) 
                    return err;
                if(!user) 
                    { console.log("Error: User does not exist.")
                      return done(null, false);} 
                if(user.password != password) 
                    { console.log("Error: Incorrect password.")
                      return done(null, false); }
              
                console.log("User ", email, "found. Login Successful!");
                return done(null, user);
            });
}));

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

app.use("/", require("./routes/home-page"));
app.use("/login", require("./routes/login"));
app.use("/admin", require("./routes/admin"));
app.use("/createUser", require("./routes/create-user"));
app.listen(3000, function() {
  console.log("Listening on Port 3000.")
})

