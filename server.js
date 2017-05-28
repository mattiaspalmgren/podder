import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import request from 'request';

import Podcast from './app/models/podcast';
import { getLatestPodcasts } from './app/plugins/itunesFetchers';
import { getPodcasts, postPodcast } from './app/routes/podcast';

const app = express();
const port = process.env.PORT || 8080; // Port is the environment variable PORT or 8080, if no env var defined. 

const options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
}; 

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', options); 

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Body parser and Morgan middleware
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
  
// Where to find static assets
app.use(express.static(__dirname + '/client/dist'));

// Enable CORS so that we can make HTTP request from webpack-dev-server
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// API routes
app.route('/podcasts')
  .post(postPodcast)
  .get(getPodcasts);

// For all other requests, send to index
app.route('*').get((req, res) => {
  getLatestPodcasts()
  res.sendFile('client/dist/index.html', { root: __dirname });
});

// Listen do defined port
app.listen(port);
console.log(`Listening on port ${port}`);