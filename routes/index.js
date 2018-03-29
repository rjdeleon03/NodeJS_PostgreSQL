var express = require('express');
var router = express.Router();
var pg = require("pg");

const config = {
  user: "postgres",
  password: "123",
  database: "dengvaxia",
  port: 5432
}

var pool = pg.Pool(config);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/db', function (req, res, next) {
  
  pool.connect(function(err,client,done) {
     if(err){
         console.log("not able to get connection "+ err);
         res.status(400).send(err);
     } 
     client.query("INSERT INTO patients(name, age, location) \
                    VALUES('Clara', '4', 'Manila')", 
                    function(err,result) {
         done(); // closing the connection;
         if(err){
             console.log(err);
             res.status(400).send(err);
         }
         if (result) {
          res.status(200).send(result);
         } else {
           res.status(200).send("NO DB DATA FOUND!!!");
         }
     });
  });
  pool.end();
});

module.exports = router;
