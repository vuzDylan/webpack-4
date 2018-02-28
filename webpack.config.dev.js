const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:5000',
    'webpack/hot/only-dev-server',
    './app/js/app.jsx',
  ],
  output: {
    path: __dirname,
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve('./app'),
      path.resolve('./app/js'),
      'node_modules',
    ],
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify('development'),
        },
      },
    }),
    new HtmlWebpackPlugin({
      title: 'INSERT TITLE HERE',
      template: './app/index.ejs',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{ loader: 'babel-loader', options: { cacheDirectory: './webpack_cache/' } }],
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(gif|png|jpg|jpeg)(\?[a-z0-9]+)?$/,
        loader: 'url-loader?limit=8192',
      },
    ],
  },
};
