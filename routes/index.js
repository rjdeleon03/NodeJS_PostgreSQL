var express = require('express');
var router = express.Router();
var pg = require("pg");

const config = {
  user: "postgres",
  password: "123",
  database: "postgres",
  port: 5432
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/db', function (req, res, next) {
  var pool = pg.Pool(config);
  pool.connect(function(err,client,done) {
     if(err){
         console.log("not able to get connection "+ err);
         res.status(400).send(err);
     } 
     client.query('SELECT * FROM student where id = $1', [1],function(err,result) {
         done(); // closing the connection;
         if(err){
             console.log(err);
             res.status(400).send(err);
         }
         res.status(200).send(result.rows);
     });
  });
  pool.end();
});

module.exports = router;
