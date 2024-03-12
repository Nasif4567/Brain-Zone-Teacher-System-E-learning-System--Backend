const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const connection = require("../utils/db");
const { uid } = require("uid");
const { checkIfExists } = require("../utils/helper");
const { generateToken,verifyToken } = require("../utils/webToken");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");




router.get("/", async (req, res) => {
    //get data from cookie and verify the token
    const token = req.cookies.token;
    if (!token) {
        return res.status(400).send("Token not provided");
    }

    try {
        const payload = verifyToken(token);
        console.log(payload);
        const { username } = payload;
        
        //get the user from the database
        connection.query(
            "SELECT * FROM teachers WHERE username = ?",
            [username],
            (error, userResults) => {
                if (error) {
                    console.error("Error executing SQL query:", error);
                    res.status(400).send("Error in logging user");
                    return;
                }

                const user = userResults[0];
                if (!user) {
                    return res.status(400).send("User does not exist");
                }
                return res.status(200).send({
                    username: user.username,
                    email: user.email,
                    name: user.name
                });
            }
        );
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).send("Token expired");
        } else {
            return res.status(400).send("Invalid token");
        }
    }
});



module.exports = router;