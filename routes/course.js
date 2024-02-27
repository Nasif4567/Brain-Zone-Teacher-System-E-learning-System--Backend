const express = require("express");
const router = express.Router();
const connection = require("../utils/db");
const { checkIfExists } = require("../utils/helper");

// Route to create a new course //	Title 	Type 	CourseID 	ContentUrl 	UserID 	CreatedAt
// Need to add check for user signed in

router.post("/create", async (req, res) => {
    const { title, type, courseID, contentUrl, username, createdAt,description } = req.body;

    connection.query(
      "SELECT UserID, Name, Username, Email, Role FROM Users WHERE username = ?",
      [username],
      (error, userResults) => {
        if (error) {
          console.error("Error executing SQL query:", error);
          res.send("Error in creating course");
          return;
        }
  
        const userID = userResults[0].UserID;
  
        connection.query(
          "INSERT INTO Course SET ?",
          {
            title: title,
            type: type,
            courseID: courseID,
            userID: userID,
            createdAt: createdAt,
            email : userResults[0].Email,
            description: description
          },
          (insertError, insertResults) => {
            if (insertError) {
              console.error("Error executing SQL query:", insertError);
              res.send("Error in creating course");
              return;
            }
  
            console.log("Course created successfully");
            res.send("Course created successfully");
          }
        );
      }
    );
  });
  

module.exports = router;
