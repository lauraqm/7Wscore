import * as titleComponent from '../components/title/title.js';
import * as matchPhotoComponent from '../components/match-photos/match-photos.js'
import { Utils } from '../services/utils.js';
//import * as firebaseClient from '../firebase-client.js';
//const db = firebaseClient.db;

const title = "Rooms";
const cardClass = ['blue-room', 'green-room', 'yellow-room', 'purple-room'];
const container = document.querySelector('.rooms-container');
let count = 0;

let db = firebase.firestore();

let initialize = () => {
    let tittle = document.querySelector('.title-container');
    tittle.appendChild(titleComponent.create(title));
    renderRooms();
}


let renderRooms = () => {
    db.collection("rooms").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            //console.log(doc.id, " => ", doc.data());
            createCard(doc.data());
        });
    }).then(() => {
        container.appendChild(createNewRoomCard());
    });
};

let createCard = (roomData) => {
    if (roomData) {
        let title = "";
        let players = roomData.players;
        players.forEach(element => {
            const name = element.username;
            if (title != '')
                title = title + `<span class='vs-title'> vs </span> <span class='title'>${name}</span>`;
            else
                title = title + `<span class='title'>${name}</span>`;
        });
        if(count == cardClass.length) {
            count = 0;
        }
        let classForCurrentRoom = cardClass[count];
        let card = `<div class = 'room-card ${classForCurrentRoom}'> ${title} </div>`;
        count++;
        
        let cardElement =  Utils.htmlToElement(card);
        let matchPhoto = matchPhotoComponent.create (roomData);
        cardElement.appendChild(matchPhoto);
        container.appendChild(cardElement);
    }
  
}


let createNewRoomCard = () => {
    let card = `<div class = 'room-card new-room'>
                    <div class='plus'>+</div>
                    <div>New room</div>
                </div>`;
    return Utils.htmlToElement(card);     
}


initialize();