import { Utils } from '../../services/utils.js';

export let create = (room) => {
    let players = '';
    room.players.forEach(element => {
        players = players + `<div class="photo" style="background-image: url('${element.pictureUrl}')"></div>`;
    });
    let template = `<div class='match-photos'> ${players}
                    </div>`;
    
    return Utils.htmlToElement(template); 
    
}