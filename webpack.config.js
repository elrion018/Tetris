const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: ['./src/js/main.ts'],
  },
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Tetris',
      template: 'index.html',
    }),

    new MiniCssExtractPlugin({}),
  ],

  module: {
    rules: [
      {
        test: /\.ts$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules'],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        exclude: ['/node_modules'],
      },
    ],
  },

  devServer: {
    compress: true,
    port: 3000,
  },

  mode: 'development',
};
