import { Utils } from '../../services/utils.js';

export let create = (room) => {
    let players = '';
    room.players.forEach(element => {
        const name = element.username;
        if(players != '')
            players = players + "<span class='vs-title'> vs </span> <span>" + name + "</span>";
        else 
            players = players + '<span>' + name + '</span>';
    });
    let template = `<div'> 
                        <div class="main-title">${players}</div>
                        <div class="underline-tittle">
                            <div class="circle-tittle"></div>
                            <div class="line-tittle"></div>
                            <div class="circle-tittle"></div>
                        </div>
                    </div>`;
    
    return Utils.htmlToElement(template); 
    
}