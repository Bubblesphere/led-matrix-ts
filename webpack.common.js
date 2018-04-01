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
    demo1: "./src/demos/index.ts",
    demo2: "./src/demos/index2.ts"
  },
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/"
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new CopyWebpackPlugin([{ 
      from: 'src/demos/*.html',
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