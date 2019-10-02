var express = require('express');
var router = express.Router();
var debug = require('debug')('plus-delta:index.js');
var login = require('../lib/loginHandler');
var signup = require('../lib/signupHandler');
const { body } = require('express-validator');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', login);
router.post(
  '/signup',
  body('cpassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
  signup
);

module.exports = router;
