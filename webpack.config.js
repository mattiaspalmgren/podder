'use strict';

const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');

const PATHS = {
  src: path.join(__dirname, 'client/src'),
  dist: path.join(__dirname, 'client/dist'),
  style: path.join(__dirname, 'client/src')
};

const devServer = (options) => {
  return {
    devServer: {
      historyApiFallback: true, 
      hot: true, 
      inline: true, 
      stats: 'errors-only',
      host: options.host,
      port: options.port, 
      contentBase: './client/dist'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin({
        multistep: true
      })
    ]
  };
}

// Common config among development and build
const common = {
  entry: {
    app: PATHS.src
  },
  output: {
    path: PATHS.dist,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { 
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: PATHS.css
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: PATHS.css
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};

// Dynamically set up config based on environment
let config;
switch(process.env.NODE_ENV) {
  case 'build':
    config = merge(
      common,
      { devtool: 'source-map' }
    );
    break;
  case 'development':
    config = merge(
      common,
      { devtool: 'eval-source-map' },
      devServer({
        host: process.env.host,
        port: 5000
      })
    );
}

module.exports = config;