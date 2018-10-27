"use strict";

const HtmlPlugin = require("html-webpack-plugin");
const ExtractPlugin = require("extract-text-webpack-plugin");
const UglifyPlugin = require("uglifyjs-webpack-plugin");
const CleanPlugin = require("clean-webpack-plugin");
const { DefinePlugin, EnvironmentPlugin } = require("webpack");

require("dotenv").config();
console.log(process.env.API_KEY);
let production = process.env.NODE_ENV === "production";

let plugins = [
  new HtmlPlugin({ template: `${__dirname}/src/index.html` }),
  new ExtractPlugin("bundle-[hash].css"),
  new EnvironmentPlugin(["NODE_ENV"]),
  new DefinePlugin({
    __DEBUG__: JSON.stringify(!production),
    "process.env.__API_KEY__": JSON.stringify(process.env.API_KEY)
  })
];

//This will scramble are source code :D
if (production) {
  plugins = [...plugins, new CleanPlugin(), new UglifyPlugin()];
}

module.exports = {
  devtool: production ? undefined : "inline-source-map",
  entry: `${__dirname}/src/Main.js`,
  devServer: {
    historyApiFallback: true
  },
  plugins,
  output: {
    path: `${__dirname}/build`,
    filename: "bundle-[hash].js",
    publicPath: process.env.CDN_URL
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        loader: ExtractPlugin.extract(["css-loader", "sass-loader"])
      }
    ]
  }
};
