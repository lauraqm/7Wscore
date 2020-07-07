import React from 'react';
import { Utils } from '../../services/utils';
import * as photoComponent from '../photo-component/photo-component';
import moment from 'moment';
import find from 'lodash-es/find';
import filter from 'lodash-es/filter';
import PropTypes from 'prop-types';

import './game-component.scss';

class Game extends React.Component {
  render () {
    const game = this.props.game;
    const formattedDate = moment.unix(game.createdOn.seconds).format('DD/MM/yyyy');
    return (
      <div className='game-component pointer' >
        <div className="game-date-players">
          <div className="bold-style">${formattedDate}</div>
          {
            game.scoreCards.map((player, key) => {
              return (<div className='player' key={player.username}> {player.username}:{player.score}</div>);
            })
          }
        </div>
      </div>
    );
  }

  createWinnerData (game, room) {
    let icon;
    let winnerCount = 1; // Default because the most common it's just 1 winner
    const players = game.scoreCards;
    //  The first player always is the highest score
    const highestScore = players[0].score;
    winnerCount = filter(players, { score: highestScore }).length;

    switch (game.victoryType) {
      case 'army':
        icon = this.createVictoryIcon('armyIcon');
        break;
      case 'science':
        icon = this.createVictoryIcon('scienceIcon');
        break;
      //  Victory points is the most common value
      default:
        icon = this.createVictoryIcon('civilianIcon');
        break;
    }

    //const figurePanel = this.createFigurePanel(room, players, winnerCount);
    //return Utils.htmlToElements(icon + figurePanel);
  };


  showGameData (gameId, roomId) {
    window.location.href = `game-detail-view.html?gameId=${gameId}&roomId=${roomId}`;
  };
}

Game.propTypes = {
  game: PropTypes.object.isRequired
};


createFigurePanel (room, players, winnerCount) {
  let img;
  let colorStyleTriangle = '';
  let colorStyleFigure = '';

  //  Multiple winners
  if (winnerCount > 2) {
    img = `<div class="photo-component photo player-photo-result multiWinnerIcon center-contain">+${winnerCount}</div>`;
  }
  //  Two winners
  else if (winnerCount === 2) {
    const [player1, player2] = players;
    const photo1 = photoComponent.createAsString(room, player1.username, 'player-photo-result first-player-photo-overlap');
    const photo2 = photoComponent.createAsString(room, player2.username, 'player-photo-result second-player-photo-overlap');
    img = `<div>${photo1}${photo2}</div>`;
  }
  //  Just 1 winner
  else {
    const result = find(room.players, { username: players[0].username });
    colorStyleTriangle = `style="border-bottom-color: ${result.color}"`;
    colorStyleFigure = `style="background-color: ${result.color}"`;
    const photo = photoComponent.createAsString(room, players[0].username, 'player-photo-result first-player-photo');
    img = `<div>${photo}</div>`;
  }

  const template = `
      <div class="flex-container">
          <div class="triangle" ${colorStyleTriangle}></div>
          <div class="figure" ${colorStyleFigure}>
              ${img}
          </div>
      </div>
  `;
  return template;
};

createVictoryIcon (victoryTypeClass) {
  const icon = `<div class ='winnerIcon ${victoryTypeClass}'></div>`;
  return icon;
};

export { Game };
