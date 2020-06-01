import { Utils } from '../../services/utils';
import * as photoComponent from '../photo-component/photo-component';
import moment from 'moment';
import find from 'lodash-es/find'

//import './game-component.css';

export let create = (game, room) => {
    let gameElement = createDataContainer(game);
    let results = createWinnerData(game, room);
    Utils.appendNodeList(gameElement, results);
    gameElement.addEventListener('click', ()=> {
        showGameData(game.id, room.id);
    } );
    return gameElement;
}

let createDataContainer = (game) => {
    let players = '';
    game.scoreCards.forEach(player => {
        players = players + `<div class="player"> ${player.username}: ${player.score}</div>`;
    });
    let formattedDate = moment.unix(game.createdOn.seconds).format ('DD/MM/yyyy');
    let template = `
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


let createWinnerData = (game, room) => {
    let icon, figurePanel;
    let winnerCount = 1; //Default because the most common it's just 1 winner
    let players = game.scoreCards;
    //The first player always is the highest score
    let highestScore = players[0].score;
    winnerCount = find(players, {score: highestScore}).length;
    
    switch (game.victoryType) {
        case 'army':
            icon = createVictoryIcon('armyIcon');
            break;
        case 'science':
            icon = createVictoryIcon('scienceIcon');
            break;
        //Victory points is the most common value
        default:
            icon = createVictoryIcon('civilianIcon');
            break;
    }
    
    figurePanel = createFigurePanel (room, players, winnerCount);
    return Utils.htmlToElements(icon + figurePanel);
}


let createFigurePanel = (room, players, winnerCount) => {
    let img;
    let colorStyleTriangle = "";
    let colorStyleFigure = "";

    //Multiple winners
    if(winnerCount > 2) {
        img = `<div class="photo-component photo player-photo-result multiWinnerIcon center-contain">${winnerCount}</div>`;
    }
    //Two winners
    else if(winnerCount === 2) {
        let [player1, player2] = players; 
        let photo1 = photoComponent.createAsString (room, player1.username, 'player-photo-result first-player-photo-overlap');
        let photo2 = photoComponent.createAsString (room, player2.username, 'player-photo-result second-player-photo-overlap');
        img = `<div>${photo1}${photo2}</div>`;
    }
    //Just 1 winner
    else {
        let result = find(room.players, { username: players[0].username });
        colorStyleTriangle = `style="border-bottom-color: ${result.color}"`;
        colorStyleFigure = `style="background-color: ${result.color}"`;
        let photo = photoComponent.createAsString (room, players[0].username, 'player-photo-result first-player-photo');
        img = `<div>${photo}</div>`;
    }

    let template = `
        <div class="flex-container">
            <div class="triangle" ${colorStyleTriangle}></div>
            <div class="figure" ${colorStyleFigure}>
                ${img}
            </div>
        </div>
    `;
    return template;
};


let createVictoryIcon = (victoryTypeClass) => {
    let icon = `<div class ='winnerIcon ${victoryTypeClass}'></div>`;
    return icon;
}

let showGameData = (gameId, roomId) => {
    window.location.href = `../game-detail/game-detail-view.html?gameId=${gameId}&roomId=${roomId}`;
}




