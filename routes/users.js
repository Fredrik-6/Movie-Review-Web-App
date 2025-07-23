const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 12;
const db = require("../db");

// Redirect if not logged in
const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect('/users/login');
  } else {
    next();
  }
};

// Register GET
router.get("/register", (req, res) => {
  res.render("register", {
    session: req.session
  });
});

// Register POST
router.post("/registered", async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.send("Please fill all fields.");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(sql, [username, email, hashedPassword], (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.send("Username or email already exists.");
        }
        return next(err);
      }
      res.send("✅ Registered successfully. <a href='/users/login'>Login here</a>");
    });
  } catch (err) {
    return next(err);
  }
});

// Login GET
router.get("/login", (req, res) => {
  res.render("login", {
    session: req.session
  });
});

// Login POST
router.post("/loggedin", (req, res, next) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ? OR email = ?";
  db.query(sql, [username, username], async (err, results) => {
    if (err) return next(err);
    if (results.length === 0) return res.send("User not found.");

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      req.session.userId = user.username;
      res.send("✅ Login successful. <a href='/'>Go to home</a>");
    } else {
      res.send("❌ Incorrect password.");
    }
  });
});

// Logout
router.get("/logout", redirectLogin, (req, res) => {
  req.session.destroy(err => {
    if (err) return res.redirect("/");
    res.send("You are now logged out. <a href='/'>Home</a>");
  });
});

module.exports = router;
