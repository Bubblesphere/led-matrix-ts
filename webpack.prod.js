const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');


module.exports = merge(common, {
  // remove comment to get source map in production
  //devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      // remove comment to get source map in production
      //sourceMap: true
    })
  ]
});