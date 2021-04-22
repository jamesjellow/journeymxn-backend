const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send('Hello World!');
    console.log("/GET request (home-page) | Status: " + res.statusCode);
});

router.post("/", (req, res) => {
    res.send('Hello World!');
    console.log("/POST request (home-page) | Status: " + res.statusCode)
});

module.exports = router;