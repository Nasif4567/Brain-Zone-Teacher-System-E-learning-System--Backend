require('dotenv').config()
const connection = require('./db');
function checkIfExists(column, value) {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM users WHERE ${column} = ?`, [value], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.length > 0);
        }
      });
    });
  }


module.exports = {
    checkIfExists
  };