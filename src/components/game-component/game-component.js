import { Utils } from '../../services/utils.js';
import * as photoComponent from '../photo-component/photo-component.js';

export let create = (game, room) => {
    let gameElement = createDataContainer(game);
    let results = createWinnerData(game, room);
    Utils.appendNodeList(gameElement, results);
    gameElement.addEventListener('click', ()=> {
        showGameData(game);
    } );
    return gameElement;
}

let createDataContainer = (game) => {
    let players = '';
    game.scoreCards.forEach(player => {
        players = players + `<div class="player"> ${player.username}: ${player.score}</div>`;
    });

    let template = `
        <div class='game-component'>
            <div class="game-date-players">
                <div class="bold-style">${new Date(game.date).toLocaleDateString()}</div>
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
    let winnerIndex = [];
    let players = game.scoreCards;
    if(players.length === 2) {
        //The first element always is the greatest score
        if (players[0].score == players[1].score)
            winnerIndex = [0,1];
        else winnerIndex = [0];
    }
    else {
        for (let index = 0; index < players.length; index++) {
            //const element = players[index];
            let current = players[index];
            let previous = players[index-1];
            let next = players[index+1];
            if (next) {
                if ((current.score == next.score) || (current.score == previous.score)) {
                    winnerIndex.push(index);
                }
            }
            else {
                if (current.score == previous.score) {
                    winnerIndex.push(index);
                }
            }
        }
    }
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
    
    figurePanel = createFigurePanel (room, players, winnerIndex);
    return Utils.htmlToElements(icon + figurePanel);
}


let createFigurePanel = (room, players, winnerIndex) => {
    let img;
    if ((winnerIndex.length > 2) || winnerIndex.length == 1){
        if (winnerIndex.length > 2) {
            img = `<div class="photo-component photo player-photo-result multiWinnerIcon center-contain">${winnerIndex.length}</div>`;
        }
        else {
            let photo = photoComponent.createAsString (room, players[0].username, 'player-photo-result first-player-photo');
            img = `
                <div>${photo}</div>`;
        }
    }
    if (winnerIndex.length == 2) {
        let [player1, player2] = players; 
        let photo1 = photoComponent.createAsString (room, player1.username, 'player-photo-result first-player-photo-overlap');
        let photo2 = photoComponent.createAsString (room, player2.username, 'player-photo-result second-player-photo-overlap');
        img = `<div>${photo1}${photo2}</div>`;
    }

    let template = `
        <div class="flex-container">
            <div class="triangle"></div>
            <div class="figure">
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

let showGameData = (game) => {
    console.log("Hello");
}




