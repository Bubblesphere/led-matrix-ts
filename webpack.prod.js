const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');

const common = require('./webpack.common.js');


module.exports = merge(common, {
  // remove comment to get source map in production
  //devtool: 'source-map',
  plugins: [
    new TypedocWebpackPlugin({
      out: './docs'
    }),
    new BundleAnalyzerPlugin(),
    new UglifyJSPlugin({
      // remove comment to get source map in production
      //sourceMap: true
    })
  ]
});