import * as gameComponent from '../components/game-component/game-component.js';
import * as matchPhotosComponet from '../components/match-photos/match-photos.js';
import * as titleComponent from '../components/title/title.js';
import { Utils } from '../services/utils.js';
import * as firebaseClient from '../firebase-client.js';


const db = firebaseClient.database;
let roomId;
let room;
/*
const room = {
    name: 'Laura vs Ronald',
    players: [
        { username: 'Lau', pictureUrl: '../assets/profilePic1.jpg', color: "#038649"},
        { username: 'Ron', pictureUrl: '', color: '#2E5FA5'}
  ]
};
*/

const games = [];
/*
const games = [
    {
        id: 0,
        date: 1574496000000,
        scoreCards: [{ username: 'Lau', score: 0 }, { username: 'Ron', score: 100 }],
        victoryType: 'army'
    },
    {
        id: 1,
        date: 1574496000000,
        scoreCards: [{ username: 'Lau', score: 20 }, { username: 'Ron', score: 20 }, { username: 'Tommy', score: 20 }],
        victoryType: 'victoryPoints'
    },

    {
        id: 2,
        date: 1574496000000,
        scoreCards: [{ username: 'Lau', score: 70 }, { username: 'Ron', score: 70 }],
        victoryType: 'victoryPoints'
    },
    {
        id: 3,
        date: 1574496000000,
        scoreCards: [{ username: 'Lau', score: 100 }, { username: 'Ron', score: 0 }],
        victoryType: 'science'
    },
    {
        id: 4,
        date: 1574582400000,
        scoreCards: [{ username: 'Lau', score: 58 }, { username: 'Ron', score: 58 }],
        victoryType: 'victoryPoints'
    },
    {
        id: 5,
        date: 1574582400000,
        scoreCards: [{ username: 'Lau', score: 0 }, { username: 'Ron', score: 100 }],
        victoryType: 'science'
    },
    {
        id: 6,
        date: 1574582400000,
        scoreCards: [{ username: 'Lau', score: 100 }, { username: 'Ron', score: 0 }],
        victoryType: 'army'
    }
];
*/

let getParams = () => {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    roomId = urlParams.get('roomId');
}

let getRoomData = () => {

    db.collection("rooms").doc(roomId).get().then(function (doc) {
        if (doc.exists) {
            room = doc.data();
            let tittle = document.querySelector('.title-container');
            let photoContainer = document.querySelector('.photo-match-container');
            tittle.appendChild(titleComponent.createTitleRoom(room));
            photoContainer.appendChild(matchPhotosComponet.create(room));
        } else {
            console.log("Room does not exist");
        }
    }).catch(function (error) {
        console.log("Error getting room:", error);
    });


    
    let gamesRef = db.collection("rooms").doc(roomId).collection("games");
    gamesRef.orderBy("createdOn", "desc").get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                let obj = doc.data();
                obj.id = doc.id;
                games.push(obj);
            });
            console.log(querySnapshot.docs);
            renderGames(games);

        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });


}





let initialize = () => {
    getParams();
    getRoomData();

}

let renderGames = (games) => {
    const mainNode = document.querySelector('.games-view');
    games.forEach(game => {
        Utils.sortPlayers(game.scoreCards);
        mainNode.appendChild(gameComponent.create(game, room));
    });
}



initialize();



