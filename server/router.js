const express = require('express');
const passport = require('passport');
require('./config/passport');

const AuthenticationController = require('./controllers/authentication');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = (app) => {
  const authRoutes = express.Router();

  // Auth Routes
  authRoutes.post('/register', AuthenticationController.register);
  authRoutes.post('/login', requireLogin, AuthenticationController.login);
  authRoutes.get('/feed', requireAuth, AuthenticationController.jwtAuth);

  app.use('/api', authRoutes);
};
