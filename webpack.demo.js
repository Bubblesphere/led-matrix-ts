var path = require("path");
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  entry: {
    alphabet: "./demos/alphabet/index.ts",
    basics: "./demos/basics/index.ts",
    playground: "./demos/playground/index.ts",
    gif: "./demos/gif/index.ts",
  },
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "distDemos"),
    publicPath: "/distDemos/",
  },
  plugins: [
    new CopyWebpackPlugin([{ 
      from: './demos/**/*.html',
      flatten: true
    },{ 
      from: './demos/**/*.json',
      flatten: true
    },{ 
      from: './demos/**/*.gif',
      flatten: true
    },{ 
      from: './demos/**/*.jpg',
      flatten: true
    }])
  ],
  module: {
    rules: [
      { 
        test: /\.tsx?$/, 
        loader: "ts-loader", 
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    stats: {
      assets: false,
      hash: false,
      chunks: false,
      errors: true,
      errorDetails: true,
    },
    overlay: true,
  }
};
