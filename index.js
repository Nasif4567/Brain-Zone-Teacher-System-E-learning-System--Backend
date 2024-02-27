// Import necessary modules
const express = require("express");
const bcrypt = require('bcryptjs');
const { uid } = require('uid');
const { checkIfExists } = require('./utils/helper');
const connection = require('./utils/db');

// Create an Express application
const app = express();

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes

// Default route
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Register route
app.post("/register", async (req, res) => {
    const { name, email, role, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const UserID = uid(9);

    try {
        // Check if user already exists from table Users
        const usernameExists = await checkIfExists('username', username);
        if (usernameExists) {
            return res.send("User already exists");
        }

        // Check if email already exists
        const emailExists = await checkIfExists('email', email);
        if (emailExists) {
            return res.send("Email already exists");
        }

        // Insert into table Users
        connection.query('INSERT INTO Users SET ?', {
            UserID: UserID,
            name: name,
            email: email,
            role: role,
            password: hashedPassword,
            username: username
        }, (error, results) => {
            if (error) {
                console.log(error);
                res.send("Error in registering user");
            } else {
                return res.send("User registered successfully");
            }
        });
    } catch (error) {
        console.error(error);
        res.send("Error in registering user");
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
