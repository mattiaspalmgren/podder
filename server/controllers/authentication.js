const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/main');

function generateToken(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 10080,
  });
}

function setUserInfo(request) {
  return {
    _id: request._id,
    email: request.email,
  };
}

// Login Route

exports.login = (req, res) => {
  const userInfo = setUserInfo(req.user);
  res.status(200).json({
    token: `JWT ${generateToken(userInfo)}`,
    user: userInfo,
  });
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

exports.jwtAuth = (req, res) => {
  const userInfo = setUserInfo(req.user);
  res.status(200).json({
    user: userInfo,
  });
};
