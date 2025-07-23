const express = require("express");
const router = express.Router();
const db = require('../db');

// Show all reviews
router.get('/list', (req, res, next) => {
  const sql = "SELECT * FROM reviews ORDER BY created_at DESC";
  db.query(sql, (err, result) => {
    if (err) return next(err);
    res.render("movielist.ejs", { availableReviews: result });
  });
});

// Show form to add review
router.get('/review', (req, res) => {
  res.render("review.ejs");
});

// Handle form submission to add review
router.post('/reviewadded', (req, res, next) => {
  const { title, review, rating, username } = req.body;
  const sql = "INSERT INTO reviews (title, review, rating, username) VALUES (?, ?, ?, ?)";
  db.query(sql, [title, review, rating, username], (err, result) => {
    if (err) return next(err);
    res.send(`✅ Review added: ${title} (${rating}/5) by ${username}`);
  });
});

// Search form
router.get('/search', (req, res) => {
  res.render("search.ejs");
});

// Search results
router.get('/search_result', (req, res, next) => {
  const search = req.query.search_text;
  const sql = "SELECT * FROM reviews WHERE title LIKE ?";
  db.query(sql, [`%${search}%`], (err, result) => {
    if (err) return next(err);
    res.render("movielist.ejs", { availableReviews: result });
  });
});

module.exports = router;
