const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserSchema = require("../models/user")

//Passport will maintain persistent login sessions.
//In order for persistent sessions to work, the authenticated user must be serialized to the session, 
//and deserialized when subsequent requests are made.
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    UserSchema.findById(id, function (err, user) {
        done(err, user);
    });
});

router.get("/", (req, res) => {
    res.send("Login Page: Redirection successful!");
    console.log("/GET request (login-page) | Status: " + res.statusCode)
});

router.post("/", 
    passport.authenticate('local', {failureRedirect: '/login' }),
    function(req, res) {
    //console.log(req.user);
    //Login Successful!
    res.redirect("/admin");
});

module.exports = router;