var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var pg = require("pg");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var patientsRouter = require('./routes/patients');

var app = express();

// database setup
const { Pool, Client } = require('pg');
const client = new Client({
    user: "postgres",
    password: "123",
    database: "dengvaxia",
    port: 5432
  })
client.connect();
client.query("CREATE TABLE IF NOT EXISTS patients (id BIGSERIAL NOT NULL, name varchar NOT NULL, age int NOT NULL, location VARCHAR NOT NULL);",
function(err, result) {
    if (err) {
        console.log("not able to get connection "+ err);
    } else {
        console.log("Successfully created Patients table!");
    }
});
app.set("dbClient", client);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/patients', patientsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
