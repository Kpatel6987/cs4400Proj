const express = require('express');
const router = express.Router();
const mysql           = require("mysql");

const con = mysql.createConnection({
  host: "academic-mysql.cc.gatech.edu",
  user: "cs4400_30",
  password: "hBMdGbRb",
  port: "3306",
  database: "cs4400_30"
});

con.connect(function(err) {
    if (err) {
        console.log("Failed to connect to 4400 DB");
        return;
    }
    console.log("Successfully connected to 4400 DB");
});

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works!');
});

module.exports = router;
