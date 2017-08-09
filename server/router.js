const express = require('express');
const AuthenticationController = require('./controllers/authentication');

module.exports = (app) => {
  const authRoutes = express.Router();

  // Auth Routes
  authRoutes.post('/register', AuthenticationController.register);
  authRoutes.post('/login', AuthenticationController.login);
  authRoutes.get('/feed', AuthenticationController.jwtAuth);

  app.use('/api', authRoutes);
};
