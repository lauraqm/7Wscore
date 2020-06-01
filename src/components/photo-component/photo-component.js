import { Utils } from '../../services/utils.js';

import "./photo-component.css";

export let create = (room, playerName, classes) => {
    let template = createAsString (room, playerName, classes);
    return Utils.htmlToElement(template);   
}

export let createAsString = (room, playerName, classes) => {
    let template;
    let url = getPhoto (room, playerName);
    if (url) {
        template = `<div class="photo-component photo ${classes}" style="background-image: url('${url}')"></div>`;
    }
    else {
        let firstLetter = playerName.charAt();
        let color = getColor (room, playerName);
        template = `<div class="photo-component photo letter ${classes}" style="background-color: ${color}">${firstLetter}</div>`;
    }
    return template;  
}


let getPhoto = (room, playerName) =>{
    let roomPlayerData = room.players.filter (player => {
        return player.username == playerName; 
    });
    return roomPlayerData[0].pictureUrl;
}

let getColor = (room, playerName) =>{
    let roomPlayerData = room.players.filter (player => {
        return player.username == playerName; 
    });
    return roomPlayerData[0].color;
}