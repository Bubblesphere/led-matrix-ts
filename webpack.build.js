const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env) => {

  return {
    entry: {
      'index': path.resolve(__dirname, './dist/esm/index.js'),
      'index.min': path.resolve(__dirname, './dist/esm/index.js'),
    },
    output: {
      path: path.resolve(__dirname, './dist/umd'), // builds to ./dist/umd/
      filename: './src/[name].js', // index.js
      library: 'ledMatrix', // aka window.myLibrary
      libraryTarget: 'umd', // supports commonjs, amd and web browsers
      globalObject: 'this'
    },
    module: {
      rules: [
        { test: /\.t|js$/, use: 'babel-loader' }
      ]
    },
    optimization: {
      minimize: false // Disable minimization for non-minified file
    },
    devtool: 'source-map',
    plugins: [
      new UglifyJSPlugin({
        sourceMap: true,
        include: /\.min\.js$/
      })
    ]
  };

};