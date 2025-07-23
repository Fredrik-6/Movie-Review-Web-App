// Import express
const express = require('express');
const router = express.Router();

// Homepage route
router.get('/', function (req, res, next) {
    res.render('index', {
        appData: req.app.locals.appData,
        session: req.session
    });
});

// About route
router.get('/about', function (req, res, next) {
    res.render('about', {
        appData: req.app.locals.appData,
        session: req.session
    });
});

// Search route
router.get('/search', function (req, res) {
    res.render('search', {
        appData: req.app.locals.appData,
        session: req.session,
        movie: null,
        error: null
    });
});

// Add review route
router.get('/review', (req, res, next) => {
  res.render('review', {
    appData: req.app.locals.appData,
    session: req.session
  });
});

// Register shortcut route (redirects to users/register)
router.get('/register', function (req, res, next) {
  res.redirect('/users/register');
});

// Export router
module.exports = router;
