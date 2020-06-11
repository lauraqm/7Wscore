const path = require('path');
//  Plug in to minify CSS
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//  Plug in to move HTML files to ./dist
const HtmlWebpackPlugin = require('html-webpack-plugin');
//  Plug in to move assets to ./dist
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'room-view': './src/rooms/room-view.js',
    'games-view': './src/games/games-view.js',
    'game-detail-view': './src/game-detail/game-detail-view.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    compress: true,
    port: 9000,
    openPage: 'room-view.html',
    contentBase: path.join(__dirname, 'dist')
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['room-view'],
      template: './src/rooms/room-view.html',
      filename: 'room-view.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/assets/profilePictures', to: 'assets/profilePictures' }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/images'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ]
  }
};
