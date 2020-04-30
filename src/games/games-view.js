import * as gameComponent  from '../components/game-component/game-component.js';
import * as matchPhotosComponet from '../components/match-photos/match-photos.js';
import * as titleComponent from '../components/title/title.js';
import { Utils } from '../Services/utils.js';


const room = {
    name: 'Laura vs Ronald',
    players: [
          { username: 'Lau', pictureUrl: '../assets/profilePic1.jpg'},
          { username: 'Ron', pictureUrl: '../assets/profilePic2.jpg'}
    ]
};

const games = [
        {
            id: 0,
            date: 1574496000000,
            players: [{ name: 'Lau', score: 0 }, { name: 'Ron', score: 100 }],
            victoryType: 'army'
        },
        {
            id: 1,
            date: 1574496000000,
            players: [{ name: 'Lau', score: 100 }, { name: 'Ron', score: 20}],
            victoryType: 'victoryPoints'
        },

        {
            id: 2,
            date: 1574496000000,
            players: [{ name: 'Lau', score: 70 }, { name: 'Ron', score: 70 }],
            victoryType: 'victoryPoints'
        },
        {
            id: 3,
            date: 1574496000000,
            players: [{ name: 'Lau', score: 100 }, { name: 'Ron', score: 0 }],
            victoryType: 'science'
        },
        {
            id: 4,
            date: 1574582400000,
            players: [{ name: 'Lau', score: 58 }, { name: 'Ron', score: 58 }],
            victoryType: 'victoryPoints'
        },
        {
            id: 5,
            date: 1574582400000,
            players: [{ name: 'Lau', score: 0 }, { name: 'Ron', score: 100 }],
            victoryType: 'science'
        },
        {
            id: 6,
            date: 1574582400000,
            players: [{ name: 'Lau', score: 100 }, { name: 'Ron', score: 0 }],
            victoryType: 'army'
        }
];

let initialize = () => {
    let tittle = document.querySelector('.title-container');  
    let photoContainer = document.querySelector('.photo-match-container');
    tittle.appendChild (titleComponent.create(room));
    photoContainer.appendChild (matchPhotosComponet.create(room));
    renderGames(games);
}

let renderGames = (games) => {
    const mainNode = document.querySelector('.games-view');
    games.forEach(game => {
        Utils.sortPlayers(game.players);
        mainNode.appendChild (gameComponent.create(game, room));
    });
}


initialize();



