var express = require('express');
var router = express.Router();
var debug = require('debug')('plus-delta:index.js');
var login = require('../lib/loginHandler');
var signup = require('../lib/signupHandler');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', login);
router.post('/signup', signup);

module.exports = router;
