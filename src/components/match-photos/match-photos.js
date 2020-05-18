import { Utils } from '../../services/utils.js';
import * as photoComponent from '../photo-component/photo-component.js'

export let create = (room) => {
    let template = `<div class='match-photos'></div>`;

    let container = Utils.htmlToElement(template);
    room.players.forEach((element, index) => {
        let classes = 'photo-overlap';
        if (index === 0) {
            classes = 'first-overlap'
        }
        container.appendChild(photoComponent.create(room, element.username, classes));
    });
    return container;
}