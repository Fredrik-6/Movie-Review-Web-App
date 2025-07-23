const express = require("express");
const router = express.Router();

router.get('/register', function (req, res, next) {
    res.render('register.ejs');
});

router.post('/registered', function (req, res, next) {
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const plainPassword = req.body.password;

    // saving data in database (just a response for now)
    res.send(' Hello ' + req.body.first + ' ' + req.body.last + 
             ' you are now registered! We will send an email to you at ' + 
             req.body.email);
});

// Export the router object so index.js can access it
module.exports = router;
