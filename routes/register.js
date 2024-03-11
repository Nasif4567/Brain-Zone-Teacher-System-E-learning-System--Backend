const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { checkIfExists } = require('../utils/helper');
const connection = require('../utils/db');
const {uid} = require('uid');

router.post("/", async (req, res) => {
    const { name, email, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    if(!name || !email || !password || !username) {
        return res.status(401).send("Please fill all the fields");
    }

    try {
        // Check if user already exists from table Users
        const usernameExists = await checkIfExists('username', username);
        if (usernameExists) {
            return res.status(401).send("User already exists");
        }

        // Check if email already exists
        const emailExists = await checkIfExists('email', email);
        if (emailExists) {
            return res.status(401).send("Email already exists");
        }
        const userID = uid(16);
        // Insert into table Users
        /*
        demo data
        {
            "name": "John Doe",
            "email": "johndoe@demo.com"
            "role": "teacher",
            "password": "password",
            "username": "johndoe"


        }
        */
        connection.query('INSERT INTO teachers SET ?', {
            teacherID: userID,
            name: name,
            email: email,
            password: hashedPassword,
            username: username
        }, (error, results) => {
            connection.end();
            if (error) {
                console.log(error);
                res.send("Error in registering user");
            } else {
                return res.status(200).send("User registered successfully");
            }
        });
    } catch (error) {
        console.error(error);
        res.status(401).send("Error in registering user");
    }
});

module.exports = router;