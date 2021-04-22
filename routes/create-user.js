const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send('Create User page');
    console.log("/GET request (create-user-page) | Status: " + res.statusCode)
});

router.post("/", (req, res) => {
    res.send('Hello World!');
    console.log("/POST request (create-user-page) | Status: " + res.statusCode)
});

module.exports = router;