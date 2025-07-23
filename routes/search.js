const express = require("express");
const axios = require("axios");
const router = express.Router();

// Render the search form
router.get("/", function (req, res) {
  res.render("search");
});

// Handle form submission and make API call
router.get("/results", async function (req, res, next) {
  const searchTerm = req.query.title;
  const apiKey = process.env.OMDB_API_KEY; // Add this key to your .env file
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(searchTerm)}`;

  try {
    const response = await axios.get(url);
    const movieData = response.data;

    if (movieData.Response === "False") {
      res.render("search", { error: movieData.Error, movie: null });
    } else {
      res.render("search", { movie: movieData, error: null });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
