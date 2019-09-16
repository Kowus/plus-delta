const { Strategy, ExtractJwt } = require('passport-jwt');
const debug = require('debug')('plus-delta:server');
const User = require('../models/user');
const { jwt } = require('./env');

module.exports = passport => {
  passport.use(
    'jwt',
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwt.key,
        issuer: jwt.issuer,
        audience: jwt.audience
      },
      async (jwt_payload, done) => {
        let user;
        try {
          user = await User.findOne(
            {
              email: jwt_payload.user.email,
              _id: jwt_payload.user._id
            },
            { password: 0 }
          );
          if (user) return done(null, user);
          return done(new Error('No user found'));
        } catch (error) {
          debug(error);
          return done(error);
        }
      }
    )
  );
};
