const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const connection = require("../utils/db");
const { uid } = require("uid");
const { checkIfExists } = require("../utils/helper");

router.post("/", async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const usernameExists = await checkIfExists("username", username);
    if (!usernameExists) {
      return res.send("User does not exist");
    }

    /* 

    {
        
        "email": "johndoe@demo.com",
        "password": "password",
        "username": "johndoe"

    }

    */

    //get the user from the database
    connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (error, userResults) => {
        if (error) {
          console.error("Error executing SQL query:", error);
          res.send("Error in logging user");
          return;
        }

        const user = userResults[0];
        if (!user) {
          return res.send("User does not exist");
        }

        //check if the password is correct
        bcrypt.compare(password, user.password, (error, isPasswordCorrect) => {
          if (error) {
            console.error("Error comparing passwords:", error);
            res.send("Error in logging user");
            return;
          }

          if (!isPasswordCorrect) {
            return res.send("Password is incorrect");
          }

          return res.send("User logged in successfully");
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.send("Error in logging user");
  }
});

module.exports = router;
