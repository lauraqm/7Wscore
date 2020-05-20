const path = require('path');

module.exports = {
  entry: {
    'room-view': './src/rooms/room-view.js',
    'games-view': './src/games/games-view.js',
    'game-detail-view': './src/game-detail/game-detail-view.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development'
};

