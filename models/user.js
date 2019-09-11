var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
  reviewsMade: {
    type: String
  },
  reviews: {
    type: String
  },
  course: String
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
  if (this.isModified('password') || this.isNew) {
    let userPassword = Buffer.from(user.password);
    pwd.hash(userPassword, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      return next();
    });
  }
  return next();
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
