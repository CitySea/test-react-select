const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.base.conf.js');

module.exports = merge(common, {
  mode: 'production',
  entry: path.join(__dirname, "../src/index.js"),
  output: {
    path: path.join(__dirname, "../dist/"),
    filename: "index.js",
    library:  'MyLibrary',
    libraryTarget: 'umd'
  }
})