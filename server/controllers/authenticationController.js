const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const config = require('../config/main');
const passport = require('passport');

require('../config/passport');

function generateToken(user) {
  const { _id, email } = user;
  return jwt.sign({ _id, email }, config.secret, { expiresIn: 10080 });
}

function setUserInfo(request) {
  return {
    _id: request._id,
    email: request.email,
    subscribedIds: request.subscribedIds,
  };
}

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

exports.register = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((existingUser, findErr) => {
      if (findErr) { return next(findErr); }
      if (existingUser) { return res.status(422).send({ error: 'That email address is already in use.' }); }

      const user = new User({ email, password });
      user.save((saveErr, userObj) => {
        if (saveErr) { return next(saveErr); }
        const userInfo = setUserInfo(userObj);
        res.status(201).json({ token: `JWT ${generateToken(userInfo)}`, user: userInfo });
      });
    });
};

exports.requireAuth = (req, res, next) => {
  const token = req.get('authorization');
  if (!token) { return res.status(403).send({ success: false, message: 'No token provided.' }); }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) { return res.status(403).send(({ success: false, message: 'Failed to authenticate token.' })); }
    req.decoded = decoded;
    next();
  });
};
