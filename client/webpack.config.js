var path = require("path");
module.exports = {
  entry: {
    index: "./index.js"
  },
  output: {
    path: path.join(__dirname, "js/dist"),
    filename: "[name].dist.js"
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel', query: {presets: ['react']}},
      { test: /\.css$/, loader: 'style!css' }
    ]
  }
};