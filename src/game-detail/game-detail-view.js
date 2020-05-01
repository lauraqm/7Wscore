import * as gameComponent  from '../components/game-component/game-component.js';
import * as titleComponent from '../components/title/title.js';
import * as detailTableComponent from '../components/detail-table/detail-table-component.js';
import { Utils } from '../Services/utils.js';


const room = {
    name: 'Laura vs Ronald',
    players: [
          { username: 'Lau', pictureUrl: '../assets/profilePic1.jpg'},
          { username: 'Ron', pictureUrl: '../assets/profilePic2.jpg'}
    ]
};

const game = {
    id: 1,
    date: 1574496000000,
    players: [{ name: 'Lau', score: 100 }, { name: 'Ron', score: 20}],
    victoryType: 'victoryPoints'
};

const gameDetail= {
    id:1,
    players: [
        {
            username: 'Lau',
            blue: 9,
            green: 3,
            yellow: 5,
            purple: 8,
            wonders: 16,
            progressTokens: 3,
            coins: 3,
            armyPawn: 5,
            total: 100
        },
        {
            username: 'Ron',
            blue: 8,
            green: 2,
            yellow: 1,
            purple: 2,
            wonders: 3,
            progressTokens: 0,
            coins: 2,
            armyPawn: 0,
            total: 20
        }

    ]
}

let initialize = () => {
    let tittle = document.querySelector('.title-container');  
    let gameDataContainer = document.querySelector('.game'); 
    tittle.appendChild (titleComponent.create(room));
    gameDataContainer.appendChild (gameComponent.create(game,room));
    let oo = detailTableComponent.create(gameDetail);
    gameDataContainer.appendChild (oo);
}


initialize();



