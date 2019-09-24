var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const debug = require('debug')('plus-delta:user.model');
const securePassword = require('secure-password');
const { parallel } = require('async');
const secureToken = require('secure-token');
const pwd = new securePassword();

var User = new Schema({
  group: {
    type: String,
    enum: ['student', 'staff']
  },
  name: String,
  email: {
    type: String,
    required: true,
    trim: true
  },
  reviewsMade: [
    {
      type: String
    }
  ],
  reviews: {
    type: String
  },
  id: { type: String, trim: true },
  password: Buffer,
  roll_no: { type: Number },
  course: String,
  class: String
});

User.path('email').validate(email => {
  var split = email.split('@');
  var dom = split[1].toString();
  if (dom.toLowerCase() !== 'acity.edu.gh') {
    throw new Error('You need to signup with the email school provided');
  }
  return true;
}, 'Email `{VALUE}` is not defined');

User.pre('save', function(next) {
  let user = this;

  parallel(
    [
      cb => {
        if (user.isModified('password') || user.isNew) {
          let userPassword = Buffer.from(user.password);
          pwd.hash(userPassword, (err, hash) => {
            if (err) return cb(err);
            user.password = hash;
            return cb();
          });
        }
      },
      cb => {
        if (user.isNew) {
          // assign id to user
          try {
            user.id = String(secureToken.create(), 'base64');
            return cb();
          } catch (err) {
            cb(err);
          }
        }
      }
    ],
    (err, results) => {
      if (err) return next(err);
      return next();
    }
  );
  // return next();
});

User.methods.comparePassword = function(password, cb) {
  let hashbuf = Buffer.alloc(securePassword.HASH_BYTES);
  let user = this;
  hashbuf.set(user.password);
  pwd.verify(Buffer.from(password), hashbuf, function(err, result) {
    if (err) return cb(err);
    if (result === securePassword.VALID_NEEDS_REHASH) {
      pwd.hash(password, (err, hash) => {
        if (err) return cb(err);
        user.password = hash;
        user.save(err => {
          debug(err);
          if (err) return cb(null, true);
          debug('rehashed');
          return cb(null, true);
        });
      });
    } else {
      cb(null, result === securePassword.VALID);
    }
  });
};
module.exports = mongoose.model('User', User);
