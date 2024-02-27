const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { checkIfExists } = require('../utils/helper');
const connection = require('../utils/db');

router.post("/", async (req, res) => {
    const { name, email, role, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

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

module.exports = router;