const express = require("express");
const router = express.Router();
const connection = require("../utils/db");
const { checkIfExists } = require("../utils/helper");

// Route to create a new course //	courseID 	courseName 	courseDescription 	courseInstructor 	created_at 	updated_at 	userID 	courseStatus 	courseImage
// Need to add check for user signed in
//demo data
/*
{
    "courseID": 111,
    "courseName": "Test Course",
    "courseDescription": "This is a test course",
    "courseInstructor": "John Doe",
    "created_at": "2021-12-12",
    "updated_at": "2021-12-12",
    "username": "johndoe",
    "courseStatus": "active",
    "courseImage": "https://www.google.com"
}
*/

router.post("/create", async (req, res) => {
  const {
    courseID,
    courseName,
    courseDescription,
    courseInstructor,
    created_at,
    updated_at,
    userID,
    courseStatus,
    courseImage,
    username,
  } = req.body;

  connection.query(
    "SELECT teacherID, name, username, email FROM teachers WHERE username = ?",
    [username],
    (error, userResults) => {
      if (error) {
        console.error("Error executing SQL query:", error);
        res.send("Error in creating course");
        return;
      }

      const userID = userResults[0].teacherID;

      connection.query(
        "INSERT INTO coursesCreated SET ?",
        {
          courseID,
          courseName,
          courseDescription,
          courseInstructor,
          created_at,
          updated_at,
          userID,
          courseStatus,
          courseImage,
        },
        (insertError, insertResults) => {
          connection.end();
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
