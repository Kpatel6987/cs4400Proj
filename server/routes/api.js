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


/*****************************************************************************
                        VALIDATION ENDPOINTS
******************************************************************************/
router.get("/checkUser", function(req, res) {
    var username = req.query.username;
    con.query("SELECT Username FROM User WHERE Username = ?",
        username, function(err, response){
        if (err)
            res.json(err);
        res.json(response);
    });
});

router.get("/checkCityOfficial", function(req, res) {
    var CityOfficialname = req.query.username;
    con.query("SELECT Username, Approved FROM CityOfficial WHERE Username = ?",
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

router.get("/checkFlagged", function(req, res) {
    con.query("SELECT Flag FROM POI WHERE LocationName = ?",
        [req.query.location], function(err, response){
        if (err)
            res.json(err);
        res.json(response);
    });
});

/*****************************************************************************
                        REGISTRATION ENDPOINTS
******************************************************************************/
router.post("/basicAddUser", function(req, res) {
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
     [username, req.body.title, false, req.body.city, req.body.state], function(err, resp) {
        if (err) {
            console.log("Error " + err);
        }
        res.json(resp);
     });
});

router.post("/addUser", function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var userType = req.body.userType;
    // Check if user exists
    con.query("SELECT Username FROM User WHERE Username = ?",
        username, function(err, response){
        if (err)
            return console.log(err);
        if (!response.length) {
            // Check if email exists
            con.query("SELECT Email FROM User WHERE Email = ?",
                email, function(err, resp){
                if (err)
                    return console.log(err);
                if (!resp.length) {
                    if (userType == "City Official") {
                        // Check if valid city state combo
                        con.query("SELECT * FROM CityState WHERE City = ? and State = ?",
                        [req.body.city, req.body.state], function(err, r3){
                            if (err)
                                return console.log("Error " + err);
                            if (r3.length == 0 || !r3.length)
                                return res.send("Invalid City, State combo");
                            else {
                                con.query("INSERT INTO User VALUES (?, ?, ?, ?)",
                                [username, email, password, userType], function(err, r) {
                                    if (err) {
                                        return console.log("Error " + err);
                                    }
                                    // Insert into City Official
                                    con.query("INSERT INTO CityOfficial VALUES (?, ?, ?, ?, ?)",
                                    [username, req.body.title, false, req.body.city, req.body.state], function(err, re) {
                                        if (err) {
                                            return console.log("Error " + err);
                                        }
                                        return res.send("Success");
                                    });

                                });
                            }
                        });
                    } else {
                        // Insert into User
                        con.query("INSERT INTO User VALUES (?, ?, ?, ?)",
                        [username, email, password, userType], function(err, r) {
                            if (err) {
                                return console.log("Error " + err);
                            }
                            return res.send("Success");
                        });
                    }
                } else {
                    return res.send("That email is already in use");
                }

            });
        } else {
            return res.send("That username is already in use");
        }
    });
});

/*****************************************************************************
                        LOGIN ENDPOINTS
******************************************************************************/
router.get("/getUser", function(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    var obj = { status: false};
    con.query("SELECT Username, UserType FROM User WHERE Username = ? and Password = ?",
        [username, password], function(err, response){
        if (err)
            res.json(err);
        res.json(response);
    });
});



/*****************************************************************************
                        DROPDOWN MENU ENDPOINTS
******************************************************************************/
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

/*****************************************************************************
                        CITY SCIENTIST ENDPOINTS
******************************************************************************/

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

/*****************************************************************************
                        ADMIN ENDPOINTS
******************************************************************************/
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

/*****************************************************************************
                        CITY OFFICIAL ENDPOINTS
******************************************************************************/
router.get("/filterPOIs", function(req, res) {
    var and = "";
    var query = "";
    if (Object.keys(req.query).length > 0)
        query = " WHERE ";
    if (Object.keys(req.query).length > 1)
        and = " AND ";
    var values = [];
    var count = 0;
    for (var propName in req.query) {
        if (req.query.hasOwnProperty(propName)) {
            values.push(req.query[propName]);
            if (propName == 'dateFrom') {
                query = query + "DateFlagged >= ?";
            } else if (propName == 'dateTo') {
                query = query + "DateFlagged <= ?";
            } else {
                query = query + propName + " = ?";
            }
        }
        count++
        if (count != Object.keys(req.query).length)
            query = query + and;
    }

    con.query('SELECT * FROM POI' + query, values, function(err,rows) {
        if(err)
            console.log("Error Selecting : %s ",err );
        res.json(rows);
    });
});

router.get("/poiDetail", function(req, res) {
    var and = "";
    var query = "";
    if (Object.keys(req.query).length > 0)
        query = " AND ";
    if (Object.keys(req.query).length > 1)
        and = " AND ";
    var values = [];
    var count = 0;
    for (var propName in req.query) {
        if (req.query.hasOwnProperty(propName)) {
            values.push(req.query[propName]);
            if (propName == 'dateFrom') {
                query = query + "DateStamp >= ?";
            } else if (propName == 'dateTo') {
                query = query + "DateStamp <= ?";
            } else if (propName == 'valueFrom') {
                query = query + "DataValue >= ?";
            } else if (propName == 'valueTo') {
                query = query + "DataValue <= ?";
            } else {
                query = query + propName + " = ?";
            }
        }
        count++
        if (count != Object.keys(req.query).length)
            query = query + and;
    }

    con.query('SELECT DateStamp, DataValue, Type FROM DataPoint WHERE ACCEPTED = true' + query, values, function(err,rows) {
        if(err)
            console.log("Error Selecting : %s ",err );
        res.json(rows);
    });
});

router.post("/flagPoi", function(req, res) {
    con.query("UPDATE POI SET Flag = true, DateFlagged = CURDATE() WHERE LocationName = ?",
     [req.body.location], function(err, resp) {
        if (err) {
            console.log(err);
        }
        res.json(resp);
     });
});

router.post("/removeFlag", function(req, res) {
    con.query("UPDATE POI SET Flag = false, DateFlagged = NULL WHERE LocationName = ?",
     [req.body.location], function(err, resp) {
        if (err) {
            console.log(err);
        }
        res.json(resp);
     });
});

router.get("/poiReport", function(req, res) {
    con.query("SELECT * FROM (SELECT locationName, "
 + "MIN(DataValue) as AQMin, AVG(DataValue) as AQAvg, MAX(DataValue) as AQMax "
 + "FROM DataPoint WHERE Type LIKE 'Air Quality' AND Accepted = 1 GROUP BY locationName) AS a "
 + "NATURAL JOIN (SELECT locationName, MIN(DataValue) as MoldMin, AVG(DataValue) as MoldAvg, MAX(DataValue) as MoldMax "
 + "FROM DataPoint WHERE Type LIKE 'MOLD' AND Accepted = 1 GROUP BY locationName) AS b "
 + "NATURAL JOIN (SELECT locationName, COUNT(*) as numPoints "
 + "FROM DataPoint WHERE Accepted = 1 GROUP BY locationName) AS c "
 + "NATURAL JOIN (SELECT locationName, Flag FROM POI) as d;" , function(err, resp) {
        if (err) {
            console.log(err);
        }
        res.json(resp);
     });
});

module.exports = router;
