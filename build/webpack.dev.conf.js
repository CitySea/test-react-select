const merge = require("webpack-merge");
const common = require("./webpack.base.conf.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    port: 3000
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "React Start",
      template: "./example/index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
});
