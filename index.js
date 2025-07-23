// Import express and ejs
var express = require ('express')
var ejs = require('ejs')

//Import mysql module
var mysql = require('mysql2')

// Create the express application object
const app = express()
const port = 3000

// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs')

// Set up the body parser 
app.use(express.urlencoded({ extended: true }))

// Create a session
const session = require('express-session');

app.use(session({
  secret: 'somerandomstuff',       // You can replace this with an env variable
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,      // ensures the cookie is only used over HTTPS (keep false when testing locally)
    httpOnly: true,    // prevents client-side JavaScript from accessing the cookie
    maxAge: 600000     // sets expiry to 10 minutes
  }
}));

// Set up public folder (for css and statis js)
app.use(express.static(__dirname + '/public'))

// Define the database connection
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'Fredrik',
    password: 'FRE18WXYZ@0603',
    database: 'movieverse'
})
// Connect to the database
db.connect((err) => {
    if (err) {
        throw err
    }
    console.log('Connected to database')
})
global.db = db

// Define our application-specific data
app.locals.appData = {appName: "Movieverse"}

// Load the route handlers
const mainRoutes = require("./routes/main")
app.use('/', mainRoutes)

// Load the route handlers for /users
const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);

// Load the route handlers for /movies
const movieRoutes = require('./routes/movies');
app.use('/movies', movieRoutes)

// Start the web app listening
app.listen(port, () => console.log(`Node app listening on port ${port}!`))

// Search route registry
const searchRoutes = require("./routes/search");
app.use("/search", searchRoutes);