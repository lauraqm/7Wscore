const path = require('path');
//  Plug in to extract all css and put them in a single output
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//  Plug in to move HTML files to ./dist
const HtmlWebpackPlugin = require('html-webpack-plugin');
//  Plug in to move assets to ./dist
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    rooms: './src/react-components/room/room.jsx',
    games: './src/react-components/game-list/game-list.jsx',
    'game-detail': './src/react-components/game-detail/game-detail.jsx'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    compress: true,
    port: 9000,
    openPage: 'room-view.html',
    contentBase: path.join(__dirname, 'dist/'),
    publicPath: 'http://localhost:9000'
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['rooms'],
      template: './src/views/room-view.html',
      filename: 'room-view.html'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['games'],
      template: './src/views/games-view.html',
      filename: 'games-view.html'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['game-detail'],
      template: './src/views/game-detail-view.html',
      filename: 'game-detail-view.html'
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
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['@babel/env'] }
          },
          'eslint-loader'
        ]
      }
    ]
  }
};
