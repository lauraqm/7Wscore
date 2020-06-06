import * as titleComponent from '../components/title/title';
import * as matchPhotoComponent from '../components/match-photos/match-photos'
import { roomService } from '../services/room-service';
import { Utils } from '../services/utils';

import './room-view.scss';

const title = "Rooms";
const cardClass = ['blue-room', 'green-room', 'yellow-room', 'purple-room'];
const container = document.querySelector('.rooms-container');
let count = 0;


let initialize = () => {
    let tittle = document.querySelector('.title-container');
    tittle.appendChild(titleComponent.create(title));
    renderRooms();
}

let renderRooms = () => {
    roomService.getAllRooms()
        .then(function (rooms) {
            rooms.forEach(room => {
                container.appendChild(createCard(room));
            });
        }).then(() => {
            container.appendChild(createNewRoomCard());
        });
};

let createCard = (room) => {
    if (room) {
        let title = "";
        let players = room.players;
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
        let cardTemplate = `<div class='room-card pointer ${classForCurrentRoom}'>
                                <div>${title} 
                                </div>
                                <div class='leaves'></div>
                            </div>`;
        let boardGameTemplate = `<div class='boardgame'>${room.boardGame}</div>`;
        let cardElement =  Utils.htmlToElement(cardTemplate);
       
        let matchPhoto = matchPhotoComponent.create (room);
        cardElement.appendChild(matchPhoto);
        cardElement.appendChild(Utils.htmlToElement(boardGameTemplate));
        
        cardElement.addEventListener('click', ()=> {
            showGames(room.id);
        } );
        count++;
        return cardElement;
    }
  
}

let createNewRoomCard = () => {
    let card = `<div class = 'pointer room-card new-room'>
                    <div class='plus'>+</div>
                    <div>New room</div>
                </div>`;
    return Utils.htmlToElement(card);     
}

function showGames (roomId) {
    window.location.href = `/src/games/games-view.html?roomId=${roomId}`;
}



initialize();