-- Create the database
CREATE DATABASE IF NOT EXISTS movieverse;
USE movieverse;

-- Create the reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  review TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  username VARCHAR(50),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)

-- Create the reviews table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first VARCHAR(50),
    last VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(255)
);