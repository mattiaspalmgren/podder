const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const babelTransformSpread = require('babel-plugin-transform-object-rest-spread');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  style: path.join(__dirname, 'src'),
};

const devServer = options => (
  {
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      stats: 'errors-only',
      host: options.host,
      port: options.port,
      contentBase: './dist',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin({
        multistep: true,
      }),
    ],
  }
);

// Common config among development and build
const common = {
  entry: {
    app: ['babel-polyfill', PATHS.src],
  },
  output: {
    path: PATHS.dist,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [babelTransformSpread],
          },
        },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: PATHS.style,
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: PATHS.style,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

// Dynamically set up config based on environment
let config;
switch (process.env.NODE_ENV) {
  case 'build':
    config = merge(
      common,
      { devtool: 'source-map' } // eslint-disable-line
    );
    break;
  default:
  case 'development':
    config = merge(
      common,
      { devtool: 'eval-source-map' },
      devServer({
        host: process.env.host,
        port: 5000,
      }) // eslint-disable-line
    );
}

module.exports = config;
