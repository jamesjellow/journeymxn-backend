// app.js
const express = require("express");
const methodOveride = require("method-override");
const passport = require("passport");
const cors = require("cors");
const session = require('express-session');

// Environment Variables
const PORT = process.env.PORT || 3000;
const url = process.env.prod_url || "http://localhost:5000" 

// Load Express
var app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(methodOveride("_method"));
app.use(cors({ origin: url, credentials: true }));
app.use(session({
  secret: 'veryimportantsecret',
  resave: true,
  saveUninitialized:true,
  cookie: {maxAge:1800000} //30 minutes 
}));
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB via Mongoose asynchronously
const { mongooseConnect } = require('./helpers/mongo.js');
mongooseConnect();

// Load Local Strategy
Local_Strategy = require('./helpers/local_strategy');
passport.use(Local_Strategy);

// Setup response headers
app.use( (req, res, next) => {
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

// Routers
app.get('/', (req, res) =>
  res.send('Hello World')
);
app.use("/login", require("./routes/login"));
app.use("/admin", require("./routes/admin"));
app.use("/submitForm", require("./routes/submitForm"));
app.use("/createUser", require("./routes/create-user"));
app.use("/logout", require("./routes/logout"));

app.listen(PORT, function() {
  console.log(`Listening on Port ${PORT}.`);
})

module.exports = app;