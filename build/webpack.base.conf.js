const path = require("path");

module.exports = {
  entry: "./example/src/index.js",
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.js$/,
        use: ["babel-loader"],
        // include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/
      }
    ]
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.join(__dirname, "../dist")
  }
};
