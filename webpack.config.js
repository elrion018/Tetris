const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: ["./src/js/main.js"],
  },
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Tetris",
    }),
  ],

  devServer: {
    compress: true,
    port: 3000,
  },

  mode: "development",
};
