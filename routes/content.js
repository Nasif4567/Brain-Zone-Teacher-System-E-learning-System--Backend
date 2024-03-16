const express = require("express");
const router = express.Router();
const connection = require("../utils/db");
const { verifyToken } = require("../utils/webToken");
const { uid } = require("uid");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = `./content/${req.params.courseID}`;
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload/:courseID", upload.single("file"), (req, res) => {
  //get the id from param

  const token = req.cookies.token;
  if (!token) {
    return res.status(400).send("Token not provided");
  }
  const payload = verifyToken(token);
  console.log(payload);
  const { username } = payload;

  connection.query(
    "SELECT teacherID FROM teachers WHERE username = ?",
    [username],
    (error, results) => {
      if (error) {
        console.error("Error executing SQL query:", error);
        res.status(500).send("Error in creating content");
        return;
      }

      if (results.length === 0) {
        return res.status(400).send("Teacher not found");
      }
    }
  );

  const { courseID } = req.params;
  const { file } = req;
  const { title, description, type } = req.body;

  if (!title || !description || !type) {
    return res.status(400).send("Please fill in all fields");
  }

  if (!file) {
    return res.status(400).send("Please upload a file");
  }

  const contentID = uid(16);
  const contentURL = `http://localhost:3000/content/${courseID}/${file.originalname}`;

  connection.query(
    "INSERT INTO courseContent SET ?",
    {
      contentID,
      courseID,
      contentTitle: title,
      contentDescription: description,
      contentURL,
    },

    (error, results) => {
      if (error) {
        console.error("Error executing SQL query:", error);
        res.status(500).send("Error in creating content");
        return;
      }

      res.status(200).send({
        message: "Content created successfully",
        contentID,
      });
    }
  );
});

module.exports = router;
