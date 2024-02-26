const express = require("express")
const mysql = require('mysql');
const app = express()

app.get("/", (req, res) => {
    res.send("Hello World")
    }
)


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'student_portal'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as id ' + connection.threadId);
});


app.listen(3000, () => {
    console.log("Server is running on port 3000")
    }
)
