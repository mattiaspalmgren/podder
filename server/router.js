const express = require('express');

const AuthenticationController = require('./controllers/authenticationController');
const PodcastController = require('./controllers/podcastController');
const UserController = require('./controllers/userController');

const requireAuth = AuthenticationController.requireAuth;

module.exports = (app) => {
  const apiRoutes = express.Router();

  // Auth Routes
  const authRoutes = express.Router();
  authRoutes.post('/register', AuthenticationController.register);
  authRoutes.post('/login', AuthenticationController.login);
  apiRoutes.use('/', authRoutes);

  // Pod Routes
  const podRoutes = express.Router();
  podRoutes.get('/podcasts', requireAuth, PodcastController.get);
  podRoutes.post('/podcasts/episodes', requireAuth, PodcastController.getFeed);
  apiRoutes.use('/', podRoutes);

  // User Routes
  const userRoutes = express.Router();
  userRoutes.put('/user', requireAuth, UserController.update);
  userRoutes.get('/user', requireAuth, UserController.get);
  apiRoutes.use('/', userRoutes);

  app.use('/api', apiRoutes);
};
