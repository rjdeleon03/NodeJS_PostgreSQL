var express = require('express');
var router = express.Router();

/* GET patients listing */
router.get('/', function(req, res, next) {
  res.render("patients/index");
});

/* GET new patient form */
router.get('/new', function(req, res, next) {
  res.render("patients/new");
});

/* POST new patient */
router.post('/', function(req, res, next) {
    console.log(req.body);

    var dbPool = req.app.get("dbPool");
    dbPool.connect(function(err,client,done) {
       if(err){
           console.log("not able to get connection "+ err);
           res.status(400).send(err);
       } 
       client.query("INSERT INTO patients(name, age, location) \
                      VALUES($1, $2, $3)",
                      [req.body.name, req.body.age, req.body.location], 
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
