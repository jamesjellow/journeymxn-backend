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

function verifyCredentialsNotNull(req, res, next){
    if (!req.body.email || !req.body.password || req.body.email.trim() === "" || req.body.password.trim() === ""){
        console.log("Email and password cannot be null. Redirecting to /login")
        res.redirect('/login');
    }
    else{
        next()
    }
}

router.get("/", (req, res) => {
    res.send("Login Page: Redirection successful!");
});

router.post("/", 
    verifyCredentialsNotNull, 
    passport.authenticate('local', {failureRedirect: '/login' }),
    function(req, res) {
        //Login Successful!
        res.redirect("/admin");
});

module.exports = router;