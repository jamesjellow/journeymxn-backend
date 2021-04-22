const express = require('express');
const router = express.Router();

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated())
      return next();
    else
    console.log("Unauthorized request. Redirecting to /login");
    return res.redirect('/login');
}

router.get("/",ensureAuthenticated, (req, res) => {
    console.log("/GET request (admin-page)");
    // console.log(req.session);
    // console.log(req.user);
    if (req.user.role == 'admin' && req.session.passport.user == req.user.id)
    console.log("Request re-authenticated in GET method for /admin. Login Successful!")
    return res.status(301).send('Access Granted! Welcome to Admin Page!');
});

module.exports = router;