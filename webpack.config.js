const path = require('path');
//  Plug in to extract all css and put them in a single output
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//  Plug in to move HTML files to ./dist
const HtmlWebpackPlugin = require('html-webpack-plugin');
//  Plug in to move assets to ./dist
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    //  entry: './src/index.js'
    room: './src/react-components/room/room.jsx'
    /*
    'games-view': './src/games/games-view.js',
    'game-detail-view': './src/game-detail/game-detail-view.js'
    */
  },
  output: {
    filename: '[name].js',
    //  filename: 'entry.js',
    publicPath: '/dist/',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    compress: true,
    port: 9000,
    openPage: 'room.html',
    contentBase: path.join(__dirname, 'dist/'),
    publicPath: 'http://localhost:9000/dist/'
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['room'],
      template: './src/react-components/room/room.html',
      filename: 'room.html'
    }),
    /*
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['games-view'],
      template: './src/games/games-view.html',
      filename: 'games-view.html'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['game-detail-view'],
      template: './src/game-detail/game-detail-view.html',
      filename: 'game-detail-view.html'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['entry'],
      template: './public/index.html',
      filename: 'index.html'
    }),
    */
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
