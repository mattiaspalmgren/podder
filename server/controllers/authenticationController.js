const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const config = require('../config/main');
const passport = require('passport');

require('../config/passport');

function generateToken(user) {
  const { _id, email } = user;
  return jwt.sign({ _id, email }, config.secret, {
    expiresIn: 10080,
  });
}

function setUserInfo(request) {
  return {
    _id: request._id,
    email: request.email,
    subscribedIds: request.subscribedIds,
  };
}

// Login Route

exports.login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err) { return next(err); }
    if (!user) { return res.status(401).send({ error: 'Wrong password or email' }); }

    const userInfo = setUserInfo(user);
    res.status(200).json({
      token: `JWT ${generateToken(userInfo)}`,
      user: userInfo,
    });
  })(req, res, next);
};

// Registration Route

exports.register = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // Validation
  if (!email) { return res.status(422).send({ error: 'You must enter an email address.' }); }
  if (!password) { return res.status(422).send({ error: 'You must enter a password.' }); }

  User.findOne({ email }, (findErr, existingUser) => {
    if (findErr) { return next(findErr); }
    if (existingUser) { return res.status(422).send({ error: 'That email address is already in use.' }); }

    const user = new User({
      email,
      password,
    });

    user.save((saveErr, userObj) => {
      if (saveErr) { return next(saveErr); }
      const userInfo = setUserInfo(userObj);
      res.status(201).json({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo,
      });
    });
  });
};

// JWT Auth Route

exports.requireAuth = (req, res, next) => {
  const token = req.get('authorization');
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else { //eslint-disable-line
        req.decoded = decoded;
        next();
      }
    });
  } else { return res.status(403).send({ success: false, message: 'No token provided.' }); }
};

