const express = require("express");
var mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOveride = require("method-override");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("./config/keys");
const passport = require("passport");
const cors = require("cors");
const mlab_db = "" // <-- insert mongoDB cluster key here

mongoose
  .connect(mlab_db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


//Load db_schema
// const QuestionResponse = require("./db_schema/question_response");
// const Student = require("./db_schema/student");
const Admin = require("./db_schema/admin")

//Load Login Validation
const validateLoginInput = require("./validation/login");

//Load Express
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOveride("_method"));
//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(passport.initialize());

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


app.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(res.body);
    const errors = {};

    Admin.findOne({ user: req.user.id })
      .then(admin_profile => {
        if (!admin_profile) {
          errors.noprofile = "There is no profile for this admin. Access denied.";
          return res.status(404).json(errors);
        }
        res.json(admin_profile);
      })
      .catch(err => res.status(404).json(err));
    
      res.redirect("/login")
  }
);


app.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  console.log(res.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  Admin.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        // Create JWT Payload
        const payload = { id: user.id, name: user.name }; 
        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 300 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});
