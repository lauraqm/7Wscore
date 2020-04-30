import { Utils } from '../../services/utils.js';

export let create = (room) => {
    let players = '';
    room.players.forEach(element => {
        const name = element.username;
        if(players != '')
            players = players + ' vs ' + name;
        else 
            players = players + name ;
    });
    let template = `<div'> 
                        <h1 class="main-title">${players}</h1>
                        <div class="underline-tittle">
                            <div class="circle-tittle"></div>
                            <div class="line-tittle"></div>
                            <div class="circle-tittle"></div>
                        </div>
                    </div>`;
    
    return Utils.htmlToElement(template); 
    
}