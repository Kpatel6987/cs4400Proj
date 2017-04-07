const express = require('express');
const router = express.Router();
const mysql           = require("mysql");

const con = mysql.createConnection({
  host: "bobbindb.chwrjcnilfzs.us-west-2.rds.amazonaws.com",
  user: "root",
  password: "password",
  port: "3306",
  database: "bobbin"
});

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works!');
});

module.exports = router;
