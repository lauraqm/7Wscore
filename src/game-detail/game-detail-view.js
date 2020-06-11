import * as gameComponent from '../components/game-component/game-component.js';
import * as titleComponent from '../components/title/title.js';
import * as detailTableComponent from '../components/detail-table/detail-table-component.js';
import { gameService } from '../services/game-service';
import { roomService } from '../services/room-service';

let roomId, gameId;

const getParams = () => {
  const query = window.location.search;
  const urlParams = new URLSearchParams(query);
  roomId = urlParams.get('roomId');
  gameId = urlParams.get('gameId');
};

const renderGameDetails = (room, game, scoreCards) => {
  const tittle = document.querySelector('.title-container');
  const gameDataContainer = document.querySelector('.game');
  tittle.appendChild(titleComponent.createTitleRoom(room));
  gameDataContainer.appendChild(gameComponent.create(game, room));
  gameDataContainer.appendChild(detailTableComponent.create(scoreCards));
};

const getData = () => {
  getParams();

  const roomPromise = roomService.getRoom(roomId);
  const gamePromise = gameService.getGame(roomId, gameId);
  const scoreCardPromise = gameService.getScoreCards(roomId, gameId);

  Promise.all([roomPromise, gamePromise, scoreCardPromise]).then(function (promiseResults) {
    const [room, game, scoreCards] = promiseResults;
    renderGameDetails(room, game, scoreCards);
  });
};

const initialize = () => {
  getParams();
  getData();
};

initialize();
