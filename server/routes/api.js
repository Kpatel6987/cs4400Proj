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

router.get("/cityOfficialList", function(req, res) {
    con.query('SELECT * FROM CityOfficial',function(err,rows) {
    if(err)
        console.log("Error Selecting : %s ",err );
        res.json(rows);
        });
});

router.post("/addUser", function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var userType = req.body.userType;
    con.query("INSERT INTO User VALUES (?, ?, ?, ?)",
     [username, email, password, userType], function(err, resp) {
        if (err) {
            console.log("Error " + err);
        }
        res.json(resp);
     });
});

router.post("/addCityOfficial", function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    con.query("INSERT INTO CityOfficial VALUES (?, ?, ?, ?, ?)",
     [username, req.body.title, false, req.body.state, req.body.state], function(err, resp) {
        if (err) {
            console.log("Error " + err);
        }
        res.json(resp);
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
    con.query("SELECT * FROM User WHERE username = ?",
        username, function(err, response){
        if (err)
            res.json(err);
        res.json(response);
    });
});

router.get("/checkCityOfficial", function(req, res) {
    var CityOfficialname = req.query.username;
    con.query("SELECT * FROM CityOfficial WHERE Username = ?",
        CityOfficialname, function(err, response){
        if (err)
            res.json(err);
        res.json(response);
    });
});

router.get("/checkCityState", function(req, res) {
    con.query("SELECT * FROM CityState WHERE City = ? and State = ?",
        [req.query.city, req.query.state], function(err, response){
        if (err)
            res.json(err);
        res.json(response);
    });
});

router.get("/cityList", function(req, res) {
    con.query('SELECT DISTINCT City FROM CityState ORDER BY City',function(err,rows) {
        if(err)
            console.log("Error Selecting : %s ",err );
        res.json(rows);
    });
});

router.get("/stateList", function(req, res) {
    con.query('SELECT DISTINCT State FROM CityState ORDER BY State',function(err,rows) {
        if(err)
            console.log("Error Selecting : %s ",err );
        res.json(rows);
    });
});

router.get("/locationList", function(req, res) {
    con.query('SELECT LocationName FROM POI',function(err,rows) {
        if(err)
            console.log("Error Selecting : %s ",err );
        res.json(rows);
    });
});

router.get("/typeList", function(req, res) {
    con.query('SELECT Type FROM DataType',function(err,rows) {
        if(err)
            console.log("Error Selecting : %s ",err );
        res.json(rows);
    });
});

router.post("/addDataPoint", function(req, res) {
    var datetime = req.body.datetime;
    var value = req.body.value;
    var location = req.body.location;
    var accepted = false;
    var dataType = req.body.dataType;
    con.query("INSERT INTO DataPoint VALUES (?, ?, ?, ?, ?)",
     [datetime, accepted, value, location, dataType], function(err, resp) {
        if (err) {
            console.log(err);
        }
        res.json(resp);
     });
});

router.post("/addPOILocation", function(req, res) {
    con.query("INSERT INTO POI SET LocationName = ?, ZipCode = ?, Flag = false, City = ?, State = ?",
     [req.body.location, req.body.zipcode, req.body.city, req.body.state], function(err, resp) {
        if (err) {
            console.log(err);
        }
        res.json(resp);
     });
});

router.get("/pendingAccounts", function(req, res) {
    con.query('SELECT Username, Email, Title, City, State FROM CityOfficial NATURAL JOIN User WHERE Approved = false',function(err,rows) {
        if(err)
            console.log("Error Selecting : %s ",err );
        res.json(rows);
    });
});

router.post("/acceptAccount", function(req, res) {
    con.query("UPDATE CityOfficial SET Approved = true WHERE Username = ?",
     [req.body.Username], function(err, resp) {
        if (err) {
            console.log(err);
        }
        res.json(resp);
     });
});

router.post("/rejectAccount", function(req, res) {
    con.query("UPDATE CityOfficial SET Approved = NULL WHERE Username = ?",
     [req.body.Username], function(err, resp) {
        if (err) {
            console.log(err);
        }
        res.json(resp);
     });
});

router.get("/pendingDataPoints", function(req, res) {
    con.query('SELECT DateStamp, DataValue, LocationName, Type FROM DataPoint WHERE Accepted = false',function(err,rows) {
        if(err)
            console.log("Error Selecting : %s ",err );
        res.json(rows);
    });
});

router.post("/acceptDataPoint", function(req, res) {
    con.query("UPDATE DataPoint SET Accepted = true WHERE LocationName = ? and DateStamp = ?",
     [req.body.LocationName, req.body.DateTime], function(err, resp) {
        if (err) {
            console.log(err);
        }
        res.json(resp);
     });
});

router.post("/rejectDataPoint", function(req, res) {
    con.query("UPDATE DataPoint SET Accepted = NULL WHERE LocationName = ? and DateStamp = ?",
     [req.body.LocationName, req.body.DateTime], function(err, resp) {
        if (err) {
            console.log(err);
        }
        res.json(resp);
     });
});

/* !!!!!!!!!      EVERYTHING BELOW THIS LINE IS FROM 2340     !!!!!!!!!! */

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


    

    router.post("/addUser", function(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        var userType = req.body.userType;
        con.query("INSERT INTO User VALUES (?, ?, ?, ?)",
         [username, email, password, userType], function(err, resp) {
            if (err) {
                console.log("Error " + err);
                res.json(resp);
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
