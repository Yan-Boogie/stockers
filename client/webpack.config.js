// @flow

const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  devtool: NODE_ENV !== 'production' ? 'source-map' : false,
  entry: [
    'react-hot-loader/patch',
    path.resolve(__dirname, 'entry.jsx'),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      API_HOST: `'${process.env.API_HOST || 'http://3.219.220.166:5000'}'`,
      NODE_ENV: `'${NODE_ENV || 'development'}'`,
      Colors: JSON.stringify({
        LAYER_FIRST: '#262626',
        LAYER_SECOND: '#464646',
        LAYER_THIRD: '#626262',
        LAYER_FOURTH: '#737373',
        BULL_MARKET: '#FF7E72',
        BEAR_MARKET: '#5EF28F',
        PRIMARY: '#FF9500',
        PRIMARY_SECOND: '#834C00',
        PRIMARY_THIRD: '#4D2D00',
        MAIN: '#1CC1D0',
        CALL_ACTION: '#44B582',
        GOOD: '#7ED321',
        WARNING: '#F5A623',
        ERROR: '#D7263D',
        SECONDARY: '#4A4A4A',
        YELLOW: '#F5DA23',
        EVENING: '#04356A',
        DARK_MODE: '#232323',
        DISABLED: '#C1C1C1',
        LOGO_RED: '#A1302B',
      }),
    }),
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'static/index.html'),
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  mode: NODE_ENV === 'production' ? 'production' : 'development',
  devServer: {
    hot: true,
    contentBase: [
      path.resolve(__dirname, 'static'),
    ],
    publicPath: '/',
    compress: true,
    port: 7000,
    filename: 'bundle.js',
    historyApiFallback: true,
    host: '0.0.0.0',
    disableHostCheck: true,
  },
  resolve: {
    mainFields: [
      'browser',
      'main',
      'module',
    ],
    extensions: [
      '.jsx',
      '.js',
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [
        'react-hot-loader/webpack',
        'babel-loader',
      ],
      include: [
        __dirname,
      ],
    }, {
      test: /\.css$/i,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
      }],
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          hash: 'sha512',
          digest: 'hex',
          name: '[hash].[ext]',
        },
      }],
      include: /static/,
    }],
  },
};
