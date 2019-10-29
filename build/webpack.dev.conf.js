const merge = require('webpack-merge');
const common = require('./webpack.base.conf.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 3000
  }
})