var express = require('express');
var pg = require("pg");
var app = express();

// var connectionString = "postgres://postgres:user@localhost:5432/postgres";
const config = {
    user: 'postgres',
    database: 'postgres',
    password: 'user',
    port: 5432
};

app.get('/', function (req, res, next) {
    var pool = new pg.Pool(config);
    pool.connect(function(err,client,done) {
       if(err){
           console.log("not able to get connection "+ err);
           res.status(400).send(err);
       } 
       client.query('SELECT * FROM student where id = $1', [2],function(err,result) {
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

app.listen(3000, function () {
    console.log('Server is running.. on Port 3000');
});