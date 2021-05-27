const express = require('express');
const router = express.Router();
const login = require("../helpers/local_strategy");

function verifyCredentialsNotNull(req, res, next){
    if (!req.body.email || !req.body.password || req.body.email.trim() === "" || req.body.password.trim() === ""){
        //console.log("Email and password cannot be null. Redirecting to /login")
        return res.status(401).json({message: "Email and password cannot be null.", success: false})
    }
    else{
        next()
    }
}

router.get("/", (req, res) => {
    return res.status(200);
  });
  
router.post("/", verifyCredentialsNotNull, login, (req, res) => {
    return res.status(200);
})

module.exports = router;