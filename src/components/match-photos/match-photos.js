import { Utils } from '../../services/utils.js';
import * as photoComponent from '../photo-component/photo-component.js';

import './match-photos.scss';

export const create = (room) => {
  const template = '<div class="match-photos"></div>';
  const container = Utils.htmlToElement(template);
  room.players.forEach((element, index) => {
    let classes = 'photo-overlap';
    if (index === 0) {
      classes = 'first-overlap';
    }
    container.appendChild(photoComponent.create(room, element.username, classes));
  });
  return container;
};
