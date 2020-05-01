import { Utils } from '../../services/utils.js';

export let create = (gameDetail) => {
    return createTable(gameDetail);
}

let createTable = (gameDetail) =>{
    let grid;
    let headers = "";
    gameDetail.players.forEach(element => {
        headers += `<th> ${element.username}</th>`;
    });
    let template = `
    <div class = 'detail-table'>
        <table class ='score-table center-component'>
            <tr>
                <th><div class='icon city'></div></th>
                ${headers}
            </tr>
            <tr>
                <td> <div class='icon blue'></div> </td>
            </tr>
            <tr>
                <td> <div class='icon green'></div> </td>
            </tr>
            <tr>
                <td> <div class='icon yellow'></div> </td>
            </tr>
            <tr>
                <td> <div class='icon purple'></div> </td>
            </tr>
            <tr>
                <td> <div class='icon wonder'></div> </td>
            </tr>
            <tr>
                <td> <div class='icon token'></div> </td>
            </tr>
            <tr>
                <td> <div class='icon coin'></div> </td>
            </tr>
            <tr>
                <td> <div class='icon armyPawn'></div> </td>
            </tr>
            <tr>
                <td> Total </td>
            </tr>
        </table>
    </div>
    `;
    let ss = Utils.htmlToElement(template);
    return ss;
}
