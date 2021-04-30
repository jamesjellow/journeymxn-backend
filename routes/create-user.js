const express = require('express');
const router = express.Router();
const AdminSchema = require("../models/admin")
const UserSchema = require("../models/user")

var mongoose = require('mongoose');
var newId = mongoose.Types.ObjectId()

router.post("/", (req, res) => {
    if (!req.body.email || !req.body.password || req.body.email.trim() === "" || req.body.password.trim() === ""){
        return res.send("Error: Email and password fields are required.")
    }
    var newUser = { _id: newId, email: req.body.email.trim(), password: req.body.password.trim(), role: "admin" };

    AdminSchema.insertMany({user:newUser, _id: newId}, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted in collection 'admin' ");
    });

    UserSchema.insertMany(newUser, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted in collection 'user'");
        });

    res.send('New Admin created successfully!');
    console.log('New Admin created successfully!')
});

module.exports = router;