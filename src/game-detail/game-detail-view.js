import * as gameComponent from '../components/game-component/game-component.js';
import * as titleComponent from '../components/title/title.js';
import * as detailTableComponent from '../components/detail-table/detail-table-component.js';
import { gameService } from '../services/game-service';
import { roomService } from '../services/room-service';

let roomId, gameId, room, game, scoreCards;

let getParams = () => {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    roomId = urlParams.get('roomId');
    gameId = urlParams.get('gameId');
}

let renderGameDetails = () => {
    let tittle = document.querySelector('.title-container');
    let gameDataContainer = document.querySelector('.game');
    tittle.appendChild(titleComponent.createTitleRoom(room));
    gameDataContainer.appendChild(gameComponent.create(game, room));
    gameDataContainer.appendChild(detailTableComponent.create(scoreCards));
}

let getData = () => {
    getParams();
    roomService.getRoom(roomId).then(function (roomData) {
        room = roomData;
    }).then
    gameService.getGame(roomId, gameId).then(function (gameData) {
        game = gameData;
        
    }).then 
    gameService.getScoreCards(roomId, gameId).then(function (scoreCardsData){
        scoreCards = scoreCardsData;
    })
    .then ( function (){
        renderGameDetails();
    });


};

let initialize = () => {
    getParams();
    getData();
}

initialize();



