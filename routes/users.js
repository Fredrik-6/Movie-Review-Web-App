const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Middleware for login redirect
const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('./login'); // redirect to login page
    } else {
        next(); // proceed to next handler
    }
};

// GET register form
router.get('/register', function (req, res, next) {
    res.render('register.ejs');
});

// POST register form
router.post('/registered', function (req, res, next) {
    const plainPassword = req.body.password;

    bcrypt.hash(plainPassword, saltRounds, function (err, hashedPassword) {
        if (err) {
            return next(err);
        }

        let result = 'Hello ' + req.body.first + ' ' + req.body.last +
                     ', you are now registered! We will send an email to you at ' + req.body.email;
        result += '<br>Your password is: ' + plainPassword + '<br>And your hashed password is: ' + hashedPassword;
        
        res.send(result);
    });
});

// Show register form
router.get('/register', function (req, res, next) {
    res.render('register', {
        appData: req.app.locals.appData,
        session: req.session
    });
});


// GET users list - protected route
router.get('/list', redirectLogin, function (req, res, next) {
    const sql = 'SELECT first, last, email FROM users';
    db.query(sql, function (err, results) {
        if (err) return next(err);
        res.render('userlist.ejs', { users: results });
    });
});

router.get('/login', function (req, res, next) {
    res.render('login.ejs', {
        session: req.session
    });
});

// POST login form
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
                    req.session.userId = req.body.username;
                    res.send('Login successful! Welcome back.');
                } else {
                    res.send('Login failed: incorrect password.');
                }
            });
        }
    });
});

// GET logout route
router.get('/logout', redirectLogin, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('./');
        }
        res.send('You are now logged out. <a href="./">Home</a>');
    });
});

module.exports = router;
