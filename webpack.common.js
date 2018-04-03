var path = require("path");
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  entry: {
    basics: "./src/demos/basics/index.ts",
    customizeAppearance: "./src/demos/customizeAppearance/index.ts"
  },
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/"
  },
  // Demos use the same library, bundle the code in common into a diff file
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 1000,
      name: "common"
    }
  },
  plugins: [
    new CopyWebpackPlugin([{ 
      from: 'src/demos/**/*.html',
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
  }
};
