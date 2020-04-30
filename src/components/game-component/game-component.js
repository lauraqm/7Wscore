import { Utils } from '../../services/utils.js';

export let create = (game, room) => {
    let gameElement = createDataContainer(game);
    let results = createWinnerData(game, room);
    Utils.appendNodeList(gameElement, results);
    return gameElement;
}

let createDataContainer = (game) => {
    let players = '';
    game.players.forEach(player => {
        players = players + `<div class="player"> ${player.name}: ${player.score}</div>`;
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
    let players = game.players;
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
            img = `
                <div>
                    <div class="photo player-photo-result multiWinnerIcon center-contain">${winnerIndex.length}</div>
                </div>`;
        }
        else {
            let url = getPhoto(room, players[0].name);
            img = `
                <div>
                    <div class="photo player-photo-result" style="background-image: url('${url}')"></div>
                </div>`;
        }
    }
    if (winnerIndex.length == 2) {
        let [player1, player2] = players; 
        let playerPhoto1 = getPhoto(room, player1.name);
        let playerPhoto2 = getPhoto(room, player2.name);
        img = `
            <div>
                <div class="photo player-photo-result first-player-photo-overlap" style="background-image: url('${playerPhoto1}')"></div>
                <div class="photo player-photo-result second-player-photo-overlap" style="background-image: url('${playerPhoto2}')"></div>
            </div>`;
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

let getPhoto = (room, playerName) =>{
    let roomPlayerData = room.players.filter (player => {
        return player.username == playerName; 
    });
    roomPlayerData
    return roomPlayerData[0].pictureUrl;
}


let createVictoryIcon = (victoryTypeClass) => {
    let icon = `<div class ='winnerIcon ${victoryTypeClass}'></div>`;
    return icon;
}




