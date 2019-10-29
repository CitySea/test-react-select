const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  entry: './example/src/index.js',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'React Start',
      template: './example/index.html'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader'],
        // include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/
      }
    ]
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.join(__dirname, '../dist')
  }
};