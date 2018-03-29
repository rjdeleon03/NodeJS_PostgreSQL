var express = require('express');
var router = express.Router();

const { Pool, Client } = require('pg');
const client = new Client({
    user: "postgres",
    password: "123",
    database: "dengvaxia",
    port: 5432
  })
  client.connect()

/* GET patients listing */
router.get('/', function(req, res, next) {
    client.query("SELECT * FROM patients", function(err, result) {
        if (err) {
            console.log("not able to get connection "+ err);
            res.status(400).send(err);
        } else {
            res.render("patients/index", {patients: result.rows});
        }
    });
});

/* GET new patient form */
router.get('/new', function(req, res, next) {
    res.render("patients/new");
});

/* POST new patient */
router.post('/', function(req, res, next) {
    client.query("INSERT INTO patients(name, age, location) VALUES($1, $2, $3)",
                [req.body.name, req.body.age, req.body.location], 
                function(err, result) {

        if (err) {
            console.log("not able to get connection "+ err);
            res.status(400).send(err);
        } else {
            console.log("Successfully added patient!");
            res.redirect("/patients");
        }
    });
});

module.exports = router;
