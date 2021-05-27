// app.js
const express = require("express");
const cors = require("cors");
// Environment Variables
const PORT = process.env.PORT || 4000;
const url = process.env.prod_url || "http://localhost:4000" 

// Load Express
const app = express();
app.use(cors());
app.use(express.json());

const { mongooseConnect } = require('./helpers/mongo.js');
mongooseConnect().then(()=>{
  app.listen(PORT, function() {
    console.log(`Listening on Port ${PORT}.`);
  })
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
  
module.exports = app;