const express = require('express');
const router = express.Router();
const AdminSchema = require("../models/admin") 


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated())
    {
        if (req.session.passport.user != req.user.id){
            //console.log("Error: 'session' user data and 'req' user data don't match.")
            return res.redirect('/login');
        }
        AdminSchema.findOne({_id: req.user.id}).then((data) => {
            //console.log(data)
            if (data !== null) {
                next()
            } else {
                //console.log("Admin not found. Redirecting to /login");
                return res.redirect('/login');
            }
        })
    }
    else
        {//console.log("Unauthorized request. Redirecting to /login");
        return res.redirect('/login');}
};
   
router.get("/",ensureAuthenticated, (req, res) => {
    //console.log("Request re-authenticated in GET method for /admin. Login Successful! ")
    return res.status(200).send('Access Granted! Welcome to Admin Page!');
});

module.exports = router;