// /helpers/local_strategy.js

const UserSchema = require("../models/user")
const AdminSchema = require("../models/admin")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

login = async function (req, res, next) {
    const email = req.body.email
    const password = req.body.password 
    try {
        const fetchExisting = await UserSchema.findOne({email: email})
        if (fetchExisting.length == 0){
            console.log("User not found.")
            return res.status(401).json({message: "Error: User not found.", success: false});
        }
        //User exists. Check if user is Admin
        admin = await AdminSchema.findOne({_id: fetchExisting._id})
        if (admin.length == 0){
            console.log("User not found.")
            return res.status(401).json({message: "Error: User not found.", success: false});
        }
        //User is an Admin. Verify Password
        bcrypt.compare(password, fetchExisting.password, function(err, result) {
            if (err) {throw err;}
            if (result == false){
                console.log("Error: Incorrect password.")
                return res.status(401).json({message: "Error: Incorrect password.", success: false});
            }
            else{
                //Passwords match! Admin credentials are valid.
                console.log("Passwords match. Authentication successful.");
                const token = jwt.sign({email: fetchExisting.email}, "SECRET")
                if (token){
                    res.json({token:token, message: "Login Successful.", success: true})
                    next()
                } else {
                    return res.status(401).json({message: "Authentication failed.", success: false});
                }
            }
        });
    }
    catch (error){
        return res.status(401).json({message: "Error: User not found.", success: false});
    }
}

module.exports = login