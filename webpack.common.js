var path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
  plugins: [
    new BundleAnalyzerPlugin(),
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