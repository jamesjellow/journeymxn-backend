const express = require('express');
const router = express.Router();
const UserSchema = require("../models/user") 
const jwt = require('jsonwebtoken')

async function authenticateUser(req, res, next){
    // console.log("REQ: ", req.headers)
    const authHeader = req.headers["authorization"];

    if (authHeader){
        const token = authHeader.split(" ")[1];
        // console.log("TOKEN: ", token)
        var decoded;
        try{
            decoded = jwt.verify(token, "SECRET")
            // console.log("DECODED: ", decoded)
            const fetchExisting = await UserSchema.findOne({email: decoded.email})
            if (fetchExisting.length == 0){
                return res.status(401).json({message: "Error: User not found.", success: false});
            }
            //Authentication Successful
            //console.log("User in JWT Auth: ", fetchExisting)
            next()
        }catch(error){
            return res.status(401).json({message: "JWT Authentication failed.", success: false});
        }
        next()
    } else{
        return res.status(401).json({message: "Authentication failed.", success: false}); 
    }
}
   
router.get("/",authenticateUser, (req, res) => {
    // console.log("Request re-authenticated in GET method for /admin. Login Successful! ")
    return res.status(200).send('Access Granted! Welcome to Admin Page!');
});

module.exports = router;