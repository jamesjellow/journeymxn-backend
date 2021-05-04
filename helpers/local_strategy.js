// /helpers/local_strategy.js

const UserSchema = require("../models/user")
const AdminSchema = require("../models/admin")
const LocalStrategy = require('passport-local').Strategy;

const strategy = 
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        UserSchema.findOne({
            email: email
        }, (err, user) => {
            console.log(email, ' tried to log in!');
            //console.log(user);
            if (err)
                return err;
            if (!user) {
                console.log("Error: User does not exist.")
                return done(null, false);
            }
            //console.log("User found in 'user' collection. ");
            AdminSchema.findOne({
                _id: user._id
            }).then((data) => {
                if (data !== null) {
                    //user._id also exists in the 'admin' collection 
                    console.log("Successfully verified that User also exists in 'admin' collection.");

                    if (user.password != password) {
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
    })


module.exports = strategy