var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/db', function (req, res, next) {  

  var dbPool = req.app.get("dbPool");
  dbPool.connect(function(err,client,done) {
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
  dbPool.end();
});

module.exports = router;
