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

module.exports = router;
