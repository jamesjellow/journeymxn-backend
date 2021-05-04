// $ npm i bcryptjs body-parser cors fs jsonwebtoken method-override mongoose passport passport-jwt passport-local validator --save
// npm run dev
const express = require("express");
var mongoose = require("mongoose");
const methodOveride = require("method-override");
const passport = require("passport");
const cors = require("cors");
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const url = process.env.prod_url || "http://localhost:3000" 
const port = process.env.PORT || 3000;

//Database connection
const uri = process.env.URI;
mongoose
  .connect(uri, {useNewUrlParser:true, useUnifiedTopology: true})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//Load Schemas
const UserSchema = require("./models/user")
const AdminSchema = require("./models/admin")

//Load Express
var app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(methodOveride("_method"));
app.use(cors({ origin: url, credentials: true }));
app.use(express.json());

app.use(session({
  secret: 'veryimportantsecret',
  resave: true,
  saveUninitialized:true,
  cookie: {maxAge:300000} //5 minutes 
}));

app.use(passport.initialize());
app.use(passport.session());

// How did passport pull data from the json from post in /login ?
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
                    //console.log("User found in 'user' collection. ");
                    AdminSchema.findOne({_id: user._id}).then((data) => {
                        if (data !== null) { 
                            //user._id also exists in the 'admin' collection 
                            console.log("Successfully verified that User also exists in 'admin' collection.");

                            if (user.password != password) 
                            {
                                console.log("Error: Incorrect password.")
                                return done(null, false); 
                            }

                            //Else, login successful!
                            console.log("User ", email, "found. Login Successful!");
                            return done(null, user);

                        } else {
                            console.log("Unauthorized. USER Does NOT exist in 'admin' collection!!");
                            return done(null, false)
                        }
                })   
             });
}));

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", url);
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
app.use("/submitForm", require("./routes/submitForm"));
