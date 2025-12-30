-- Copy and paste these commands into your MySQL Workbench or Command Line Client

-- 1. Create the Database
CREATE DATABASE IF NOT EXISTS smart_crop_db;

-- 2. Select the Database
USE smart_crop_db;

-- 3. Create the Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. (Optional) Insert a dummy user manually to test
-- INSERT INTO users (name, email, password) VALUES ('Demo User', 'demo@example.com', 'password123');

-- 5. Check if data exists
-- SELECT * FROM users;
