const merge = require("webpack-merge");
const path = require("path");
const common = require("./webpack.base.conf.js");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: "production",
  entry: path.join(__dirname, "../example/src/index.js"),
  output: {
    path: path.join(__dirname, "../dist/"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "React Start",
      template: "./example/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "index.css",
      chunkFilename: "[id].[hash].css",
      ignoreOrder: false
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
});
