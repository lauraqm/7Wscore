import { Utils } from '../../services/utils';
import * as photoComponent from '../photo-component/photo-component';
import moment from 'moment';
import find from 'lodash-es/find';
import filter from 'lodash-es/filter';

import './game-component.scss';

export const create = (game, room) => {
  const gameElement = createDataContainer(game);
  const results = createWinnerData(game, room);
  Utils.appendNodeList(gameElement, results);
  gameElement.addEventListener('click', () => {
    showGameData(game.id, room.id);
  });
  return gameElement;
};

const createDataContainer = (game) => {
  let players = '';
  game.scoreCards.forEach(player => {
    players = players + `<div class="player"> ${player.username}: ${player.score}</div>`;
  });
  const formattedDate = moment.unix(game.createdOn.seconds).format('DD/MM/yyyy');
  const template = `
        <div class='game-component pointer'>
            <div class="game-date-players">
                <div class="bold-style">${formattedDate}</div>
                <div>
                    ${players}
                </div>
            </div>
        </div>
    `;
  return Utils.htmlToElement(template);
};

const createWinnerData = (game, room) => {
  let icon;
  let winnerCount = 1; // Default because the most common it's just 1 winner
  const players = game.scoreCards;
  //  The first player always is the highest score
  const highestScore = players[0].score;
  winnerCount = filter(players, { score: highestScore }).length;

  switch (game.victoryType) {
    case 'army':
      icon = createVictoryIcon('armyIcon');
      break;
    case 'science':
      icon = createVictoryIcon('scienceIcon');
      break;
    //  Victory points is the most common value
    default:
      icon = createVictoryIcon('civilianIcon');
      break;
  }

  const figurePanel = createFigurePanel(room, players, winnerCount);
  return Utils.htmlToElements(icon + figurePanel);
};

const createFigurePanel = (room, players, winnerCount) => {
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

const createVictoryIcon = (victoryTypeClass) => {
  const icon = `<div class ='winnerIcon ${victoryTypeClass}'></div>`;
  return icon;
};

const showGameData = (gameId, roomId) => {
  window.location.href = `../game-detail/game-detail-view.html?gameId=${gameId}&roomId=${roomId}`;
};
