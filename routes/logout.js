const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.clearCookie(req.session.passport.user);
    req.logout();
    req.session.destroy((err) => {
        res.redirect('/')
    });
});

module.exports = router;