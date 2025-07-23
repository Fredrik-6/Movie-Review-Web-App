const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'movieverse'
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed: ', err.stack);
    return;
  }
  console.log('✅ Connected to MySQL database.');
});

module.exports = connection;