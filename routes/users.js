const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require('../db'); // ensure this is pointing to your db.js
const saltRounds = 10;

// Middleware to protect routes
const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('./login');
    } else {
        next();
    }
};

// Show register form
router.get('/register', function (req, res, next) {
    res.render('register.ejs');
});

// Register a user
router.post('/registered', function (req, res, next) {
    const plainPassword = req.body.password;

    bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
        if (err) return next(err);

        let result = 'Hello ' + req.body.first + ' ' + req.body.last +
                     ', you are now registered! We will send an email to you at ' + req.body.email;
        result += '<br>Your password is: ' + plainPassword + '<br>And your hashed password is: ' + hashedPassword;

        res.send(result);
    });
});

// Login form
router.get('/login', function (req, res, next) {
    res.render('login.ejs');
});

// Check login credentials
router.post('/loggedin', function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    const sql = 'SELECT password FROM users WHERE username = ? OR email = ?';
    db.query(sql, [username, username], function (err, results) {
        if (err) return next(err);

        if (results.length === 0) {
            res.send('Login failed: user not found.');
        } else {
            const hashedPassword = results[0].password;

            bcrypt.compare(password, hashedPassword, function (err, result) {
                if (err) return next(err);

                if (result === true) {
                    // ✅ Save user session
                    req.session.userId = req.body.username;

                    res.send('Login successful! Welcome back.');
                } else {
                    res.send('Login failed: incorrect password.');
                }
            });
        }
    });
});

// List users (protected)
router.get('/list', redirectLogin, function (req, res, next) {
    const sql = 'SELECT first, last, email FROM users';
    db.query(sql, function (err, results) {
        if (err) return next(err);
        res.render('userlist.ejs', { users: results });
    });
});

module.exports = router;
