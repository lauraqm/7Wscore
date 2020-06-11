/* eslint-disable quotes */
import { Utils } from '../../services/utils.js';

import "./photo-component.scss";

export const create = (room, playerName, classes) => {
  const template = createAsString(room, playerName, classes);
  return Utils.htmlToElement(template);
};

export const createAsString = (room, playerName, classes) => {
  let template;
  const url = getPhoto(room, playerName);
  if (url) {
    template = `<div class="photo-component photo ${classes}" style="background-image: url('${url}')"></div>`;
  }
  else {
    const firstLetter = playerName.charAt();
    const color = getColor(room, playerName);
    template = `<div class="photo-component photo letter ${classes}" style="background-color: ${color}">${firstLetter}</div>`;
  }
  return template;
};

const getPhoto = (room, playerName) => {
  const roomPlayerData = room.players.filter(player => {
    return player.username === playerName;
  });
  return roomPlayerData[0].pictureUrl;
};

const getColor = (room, playerName) => {
  const roomPlayerData = room.players.filter(player => {
    return player.username === playerName;
  });
  return roomPlayerData[0].color;
};
