require('dotenv').config()

// Import necessary modules
const express = require("express");
const connection = require('./utils/db');
const registerRoute = require('./routes/register');
const dotenv = require('dotenv')

// Create an Express application
const app = express();

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the register route
app.use("/register", registerRoute);

// Define routes

// Default route
app.get("/", (req, res) => {
    res.send("Hello World");
});



// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
