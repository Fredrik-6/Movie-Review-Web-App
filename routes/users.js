const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.get('/register', function (req, res, next) {
    res.render('register.ejs');
});

router.post('/registered', function (req, res, next) {
    const plainPassword = req.body.password;

    bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
        if (err) {
            return next(err);
        }

        let result = 'Hello ' + req.body.first + ' ' + req.body.last +
                     ', you are now registered! We will send an email to you at ' + req.body.email;
        result += '<br>Your password is: ' + plainPassword + '<br>And your hashed password is: ' + hashedPassword;
        
        res.send(result);
    });

    //List users route
router.get('/users/list', function (req, res, next) {
    const sql = 'SELECT first, last, email FROM users';
    db.query(sql, function (err, results) {
        if (err) {
            return next(err);
        }
        res.render('userlist.ejs', { users: results });
    });
});

    //Login route rendering login form
router.get('/login', function (req, res, next) {
  res.render('login.ejs');
});

//User logged in route (Checks credentials)
const bcrypt = require('bcrypt');

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
          res.send('Login successful! Welcome back.');
        } else {
          res.send('Login failed: incorrect password.');
        }
      });
    }
  });
});


});

module.exports = router;
