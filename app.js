// app.js
const express = require("express");
const methodOveride = require("method-override");
const passport = require("passport");
const cors = require("cors");
const session = require('express-session');

// Environment Variables
const PORT = process.env.PORT || 4000;
const url = process.env.prod_url || "http://localhost:4000" 

// Load Express
var app = express();
app.use(cors({ credentials: true }));
app.set("view engine", "ejs");
app.use(express.json());
app.use(methodOveride("_method"));
app.use(session({
  secret: 'veryimportantsecret',
  resave: true,
  saveUninitialized:true,
  cookie: {maxAge:1800000} //30 minutes 
}));
app.use(passport.initialize());
app.use(passport.session());

// Load Local Strategy
Local_Strategy = require('./helpers/local_strategy');
passport.use(Local_Strategy);


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