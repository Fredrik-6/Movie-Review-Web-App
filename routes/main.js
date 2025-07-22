const express = require("express");
const router = express.Router();

// Handle our routes
router.get('/', function(req, res) {
  res.render('index.ejs', { appData: { appName: 'MovieVerse' } });
});

router.get('/about', function(req, res) {
  res.render('about.ejs', { appData: { appName: 'MovieVerse' } });
});

// Export the router object
module.exports = router;
