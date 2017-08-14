const express = require('express');
const AuthenticationController = require('./controllers/authenticationController');
const PodcastController = require('./controllers/podcastController');

module.exports = (app) => {
  const authRoutes = express.Router();
  const podRoutes = express.Router();

  // Auth Routes
  authRoutes.post('/register', AuthenticationController.register);
  authRoutes.post('/login', AuthenticationController.login);
  authRoutes.get('/feed', AuthenticationController.jwtAuth);

  // Pod Routes
  podRoutes.post('/podcast', PodcastController.add);

  app.use('/api', authRoutes, podRoutes);
};
