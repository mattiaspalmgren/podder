const express = require('express');

const app = express();
const logger = require('morgan');
const config = require('./config/main');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./router');

app.listen(config.port);
console.log(`Server is running on port ${config.port}.`);

// Connect DB
mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useMongoClient: true });

// Middleware
app.use(logger('dev'));
app.use((req, res, next) => { // Enable CORS from client-side
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router(app);
