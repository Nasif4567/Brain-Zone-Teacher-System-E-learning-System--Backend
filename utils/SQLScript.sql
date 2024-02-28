-- db name: llm-portal

CREATE DATABASE IF NOT EXISTS llm-portal 
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- TABLE `llm-portal`.`users` 
-- userID, username, password, email, role, created_at, updated_at
CREATE TABLE IF NOT EXISTS users (
    userID VARCHAR(255) NOT NULL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    
)

-- Table `llm-portal`.`coursesCreated`
-- courseID, courseName, courseDescription, courseInstructor, created_at, updated_at, userID, courseStatus , courseImage
CREATE TABLE IF NOT EXISTS coursesCreated (
    courseID VARCHAR(255) NOT NULL PRIMARY KEY,
    courseName VARCHAR(255) NOT NULL,
    courseDescription TEXT NOT NULL,
    courseInstructor VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userID) REFERENCES users(userID),
    courseStatus VARCHAR(255) NOT NULL,
    courseImage VARCHAR(255) NOT NULL
)

-- Table `llm-portal`.`courseContent`
-- contentID, courseID, contentTitle, contentDescription, contentURL, created_at, updated_at
CREATE TABLE IF NOT EXISTS courseContent (
    contentID VARCHAR(255) NOT NULL PRIMARY KEY,
    courseID VARCHAR(255) NOT NULL,
    contentTitle VARCHAR(255) NOT NULL,
    contentDescription TEXT NOT NULL,
    contentURL VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (courseID) REFERENCES coursesCreated(courseID)
)

-- Table `llm-portal`.`courseEnrollment`
-- enrollmentID, courseID, userID, created_at, updated_at
CREATE TABLE IF NOT EXISTS courseEnrollment (
    enrollmentID VARCHAR(255) NOT NULL PRIMARY KEY,
    courseID VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (courseID) REFERENCES coursesCreated(courseID),
    FOREIGN KEY (userID) REFERENCES users(userID)
)

-- more tables to be added as needed