import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

const app = express();
// Port is the environment variable PORT or 8080, if no env var defined. 
const port = process.env.PORT || 8080;

// Where to find static assets
app.use(express.static(__dirname + '/client/dist'));

// Enable CORS so that we can make HTTP request from webpack-dev-server
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// For all requests, send to index
app.route('*').get((req, res) => {
  res.sendFile('client/dist/index.html', { root: __dirname });
});

// Listen do defined port
app.listen(port);
console.log(`Listening on port ${port}`);