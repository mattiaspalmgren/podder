const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

const localOptions = { usernameField: 'email' };

// Local strategy
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email }, (findErr, user) => {
    if (findErr) { return done(findErr); }
    if (!user) { return done(null, false); }

    user.comparePassword(password, (compareErr, isMatch) => {
      if (compareErr) { return done(compareErr); }
      if (!isMatch) { return done(null, false); }

      return done(null, user);
    });
  });
});

const config = require('./main');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(), // Check authorization headers for JWT
  secretOrKey: config.secret,
};

// JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload._id, (err, user) => {
    if (err) { return done(err, false); }
    const res = user ? done(null, user) : done(null, false);
    return res;
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
