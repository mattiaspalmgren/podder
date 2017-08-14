const express = require('express');

const AuthenticationController = require('./controllers/authenticationController');
const PodcastController = require('./controllers/podcastController');
const UserController = require('./controllers/userController');

module.exports = (app) => {
  const apiRoutes = express.Router();

  // Auth Routes
  const authRoutes = express.Router();
  authRoutes.post('/register', AuthenticationController.register);
  authRoutes.post('/login', AuthenticationController.login);
  apiRoutes.use('/', authRoutes);

  // Middleware to require auth on following routes
  apiRoutes.use(AuthenticationController.requireAuth);

  // Pod Routes
  const podRoutes = express.Router();
  podRoutes.post('/podcast', PodcastController.add);
  podRoutes.get('/podcast', PodcastController.get);
  apiRoutes.use('/', podRoutes);

  // User Routes
  const userRoutes = express.Router();
  userRoutes.put('/user', UserController.update);
  apiRoutes.use('/', userRoutes);

  app.use('/api', apiRoutes);
};
