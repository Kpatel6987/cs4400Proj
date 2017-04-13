const express = require('express');
const router = express.Router();
const mysql = require("mysql");

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

router.get("/userList", function(req, res) {
        con.query('SELECT * FROM User',function(err,rows) {
        if(err)
           console.log("Error Selecting : %s ",err );
            res.json(rows);
         });
    });

    router.get("/getUser", function(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        var obj = { status: false};
        con.query("SELECT * FROM User WHERE username = ? and password = ?",
            [username, password], function(err, response){
            if (err)
                res.json(err);
            res.json(response);

        });
    });

    router.get("/checkUser", function(req, res) {
        var username = req.query.username;
        var obj = { status: false};
        con.query("SELECT * FROM userInfo WHERE username = ?",
            username, function(err, response){
            if (err)
                res.json(err);
            res.json(response);
        });
    });

    router.put("/addUser", function(req, res) {
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        var accountType = req.body.accountType;
        var values = "(" + firstName + "," + lastName + "," + username + "," + email + "," + password + "," + accountType + ")";
        con.query("INSERT INTO userInfo SET firstName = ?, lastName = ?, "
            + "username = ?, email = ?, password = ?, accountType = ?",
         [firstName, lastName, username, email, password, accountType], function(err, resp) {
            if (err) {
                console.log("Error " + err);
            }
            res.json(resp);
         });
    });

    router.put("/editUser", function(req, res) {
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        var accountType = req.body.accountType;
        var address = req.body.address;
        var title = req.body.title;
        con.query("UPDATE userInfo SET firstName = ?," +
            " lastName = ?, email = ?, password = ?, address = ?, " +
            "title = ?" +
            " WHERE " +
            "username = ?", [firstName, lastName, email, password, address,
            title, username], function(err, resp){
                if (err) {
                    res.json(resp);
                    console.log("Error");
                } else {
                    res.json(resp);
                    console.log("Success");
                }
        });
    });



    /* ------------------------------------------------
    Source Report Table Endpoints
    --------------------------------------------------*/
    router.get("/sourceReportList", function(req, res) {
        con.query('SELECT * FROM sourceReportInfo',function(err,rows) {
        if(err)
           console.log("Error Selecting : %s ",err );
            res.json(rows);
         });
    });

    router.get("/sourceReportCount", function(req, res) {
        con.query('SELECT COUNT(*) as rowcount FROM sourceReportInfo',function(err,rows) {
        if(err)
           console.log("Error Selecting : %s ",err );
            res.json(rows);
         });
    });

    router.put("/addSourceReport", function(req, res) {
        var date = req.body.date;
        var reportNumber = req.body.reportNumber;
        var username = req.body.username;
        var longitude = req.body.longitude;
        var latitude = req.body.latitude;
        var type = req.body.type;
        var condition = req.body.condition;
        con.query("INSERT INTO sourceReportInfo SET date = ?, reportNumber = ?, username = ?, "
            + "longitude = ?, latitude = ?, type = ?, cond = ?",
            [date, reportNumber, username, longitude, latitude, type, condition],
            function(err, resp) {
            if (err) {
                console.log("Error " + err);
            }
            console.log(resp);
            res.json(resp);
         });
    });


    /* ------------------------------------------------
    Quality Table Endpoints
    --------------------------------------------------*/
    router.get("/qualityReportList", function(req, res) {
        con.query('SELECT * FROM qualityReportInfo',function(err,rows) {
        if(err)
           console.log("Error Selecting : %s ",err );
            res.json(rows);
         });
    });

    router.get("/qualityReportCount", function(req, res) {
        con.query('SELECT COUNT(*) as rowcount FROM qualityReportInfo',function(err,rows) {
        if(err)
           console.log("Error Selecting : %s ",err );
            res.json(rows);
         });
    });

    router.put("/addQualityReport", function(req, res) {
        var date = req.body.date;
        var reportNumber = req.body.reportNumber;
        var username = req.body.username;
        var longitude = req.body.longitude;
        var latitude = req.body.latitude;
        var condition = req.body.condition;
        var virus = req.body.virus;
        var chem = req.body.chem;
        con.query("INSERT INTO qualityReportInfo SET date = ?, reportNumber = ?, username = ?, "
            + "longitude = ?, latitude = ?, cond = ?, virus = ?, chem = ?",
            [date, reportNumber, username, longitude, latitude, condition, virus, chem],
            function(err, resp) {
            if (err) {
                console.log("Error");
            }
            res.json(resp);
         });
    });




module.exports = router;
