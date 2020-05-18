import * as gameComponent  from '../components/game-component/game-component.js';
import * as titleComponent from '../components/title/title.js';
import * as detailTableComponent from '../components/detail-table/detail-table-component.js';

const room = {
    name: 'Laura vs Ronald',
    players: [
          { username: 'Lau', pictureUrl: '../assets/profilePic1.jpg', color: "#038649"},
          { username: 'Ron', pictureUrl: '../assets/profilePic2.jpg', color: '#2E5FA5'}
    ]
};

const game = {
    id: 1,
    date: 1574496000000,
    scoreCards: [{ username: 'Lau', score: 100 }, { username: 'Ron', score: 20}],
    victoryType: 'victoryPoints'
};

const scoreCards= {
    id:1,
    players: [
        {
            username: 'Lau',
            civilian: 9,
            scientific: 3,
            commercial: 5,
            guild: 8,
            wonders: 16,
            progress: 3,
            coins: 3,
            military: 5,
            total: 100
        },
        {
            username: 'Ron',
            civilian: 8,
            scientific: 2,
            commercial: 1,
            guild: 2,
            wonders: 3,
            progress: 0,
            coins: 2,
            military: 0,
            total: 20
        }

    ]
}

let initialize = () => {
    let tittle = document.querySelector('.title-container');  
    let gameDataContainer = document.querySelector('.game'); 
    tittle.appendChild (titleComponent.createTitleRoom(room));
    gameDataContainer.appendChild (gameComponent.create(game,room));
    gameDataContainer.appendChild (detailTableComponent.create(scoreCards));
}


initialize();


