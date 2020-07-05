import * as gameComponent from '../components/game-component/game-component.js';
import * as matchPhotosComponet from '../components/match-photos/match-photos.js';
import * as titleComponent from '../components/title/title.js';
import { Utils } from '../services/utils.js';
import { roomService } from '../services/room-service';
import { gameService } from '../services/game-service';

import '../general-styles/reset-css.css';
import '../general-styles/styles.css';

let roomId;
const getParams = () => {
  const query = window.location.search;
  const urlParams = new URLSearchParams(query);
  roomId = urlParams.get('roomId');
};

const getRoomData = () => {
  roomService.getRoom(roomId).then(function (room) {
    const tittle = document.querySelector('.title-container');
    const photoContainer = document.querySelector('.photo-match-container');
    tittle.appendChild(titleComponent.createTitleRoom(room));
    photoContainer.appendChild(matchPhotosComponet.create(room));
    gameService.getGamesByRoom(roomId).then(function (games) {
      renderGames(room, games);
    });
  });
};

const renderGames = (room, games) => {
  const mainNode = document.querySelector('.games-view');
  games.forEach(game => {
    Utils.sortPlayers(game.scoreCards);
    mainNode.appendChild(gameComponent.create(game, room));
  });
};

const initialize = () => {
  getParams();
  getRoomData();
};

initialize();
