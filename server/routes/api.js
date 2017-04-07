const express = require('express');
const router = express.Router();
const mysql           = require("mysql");

const con = mysql.createConnection({
  host: "https://academic-mysql.cc.gatech.edu/cs4400_30",
  user: "cs4400_30",
  password: "hBMdGbRb",
  port: "3306",
  database: "cs4400_30"
});

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

module.exports = router;
