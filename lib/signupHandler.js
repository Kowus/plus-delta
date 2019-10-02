const User = require('../models/user');
const { validationResult } = require('express-validator');
const { jwt: jwt_config } = require('../config/env');
const jwt = require('jsonwebtoken');
const debug = require('debug')('plus-delta:signupHandler');

async function handler(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  let userEmail, userUsname;
  try {
    userEmail = await User.findOne({ email: req.body.email });
    userUsname = await User.findOne({ username: req.body.username });
    if (userEmail)
      return res.status(422).json({
        message: 'Sorry, that email has already been used with an account.'
      });
    else if (userUsname)
      return res.status(422).json({
        message: 'Sorry, that username has already been used with an account.'
      });
    else {
      let { username, password, email, cpassword } = req.body;
      let newUser = new User({
        username,
        password,
        email
      });
      let user;
      try {
        user = await newUser.save();
        let token;
        try {
          token = await jwt.sign(
            {
              user
            },
            jwt_config.key,
            {
              audience: jwt_config.audience,
              issuer: jwt_config.issuer,
              expiresIn: '6h'
            }
          );
          res.json({ token });
        } catch (error) {
          debug(error);
          res.status(422).json({
            message:
              "Sorry, couldn't create your account at this time, please contact support."
          });
        }
      } catch (err) {
        debug(err);
        res.status(422).json(err);
      }
    }
  } catch (err) {
    debug(err);
    return res.status(500).json({
      message: 'Could not create your account'
    });
  }
}

module.exports = handler;
