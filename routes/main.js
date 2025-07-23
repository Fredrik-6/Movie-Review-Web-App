// routes/main.js

const express = require("express");
const router = express.Router();

// Homepage
router.get("/", function (req, res) {
    res.render("index.ejs");
});

// About page
router.get("/about", function (req, res) {
    res.render("about.ejs");
});

// Search page
router.get("/search", function (req, res) {
    res.render("search.ejs");
});

module.exports = router;
