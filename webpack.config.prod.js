const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    main: './app/js/app.jsx',
  },
  output: {
    path: path.join(__dirname, 'dist', 'assets'),
    filename: '[name].[chunkhash].js',
    publicPath: '/assets/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve('./app'),
      path.resolve('./app/js'),
      'node_modules',
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify('production'),
        },
      },
    }),
    new LodashModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      chunksSortMode: 'dependency',
      title: 'INSERT TITLE HERE',
      filename: '../index.html',
      template: './app/index.ejs',
    }),
    ...process.env.DEBUG ? [new BundleAnalyzerPlugin({
      analyzerMode: 'server',
    })] : [],
  ],
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'async',
      minSize: 8196,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: false,
        commons: {
          minChunks: 2,
          chunks: 'all',
          // name: 'commons', // Optimizes for space vs loading what is needed
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        loader: ['style-loader', 'css-loader', 'sass-loader'],
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
