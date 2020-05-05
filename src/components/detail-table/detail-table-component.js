import { Utils } from '../../services/utils.js';

export let create = (gameDetail) => {
    return createTable(gameDetail);
}

let createTable = (gameDetail) =>{
    /*
    let blue = "";
    let green = "";
    let yellow = "";
    let purple = "";
    let wonder = "";
    let token = "";
    let coin = "";
    let armyPawn = "";
    let total = "";
    let headers = "";
    gameDetail.players.forEach(element => {
        headers += `<th> ${element.username}</th>`;
        blue += `<td> ${element.blue} </td>`;
        green += `<td> ${element.green} </td>`;
        yellow += `<td> ${element.yellow} </td>`;
        purple += `<td> ${element.purple} </td>`;
        wonder += `<td> ${element.wonders} </td>`;
        token += `<td> ${element.progressTokens} </td>`;
        coin += `<td> ${element.coins} </td>`;
        armyPawn += `<td> ${element.armyPawn} </td>`;
        total += `<td> ${element.total} </td>`;
    });
    let template = `
        <div class = 'detail-table'>
            <table class ='score-table center-component'>
                <tr>
                    <th><div class='city-parent'><div class='icon city'></div></div></th>
                    ${headers}
                </tr>
                <tr>
                    <td> <div class='icon blue'></div> </td>
                    ${blue}
                </tr>
                <tr>
                    <td> <div class='icon green'></div> </td>
                    ${green}
                </tr>
                <tr>
                    <td> <div class='icon yellow'></div> </td>
                    ${yellow}
                </tr>
                <tr>
                    <td> <div class='icon purple'></div> </td>
                    ${purple}
                </tr>
                <tr>
                    <td> <div class='icon wonder'></div> </td>
                    ${wonder}
                </tr>
                <tr>
                    <td> <div class='icon token'></div> </td>
                    ${token}
                </tr>
                <tr>
                    <td> <div class='icon coin'></div> </td>
                    ${coin}
                </tr>
                <tr>
                    <td> <div class='icon armyPawn'></div> </td>
                    ${armyPawn}
                </tr>
                <tr>
                    <td> Total </td>
                    ${total}
                </tr>
            </table>
        </div> 
    `;
    */
    let rows = merge (gameDetail.players);
    let table = generateTable(rows);
    return Utils.htmlToElement(table);
}



let merge = (players) => {
    let rows = ["username", "blue", "green", "yellow", "purple", "wonders", "progressTokens", "coins", "armyPawn", "total"];
    let output = [];
    players.forEach((player) => {
        rows.forEach((rowKey, rowIndex) => {
            let newOutPutRow = [];
            if (output[rowIndex]) {
                output[rowIndex].push(player[rowKey]);
            }
            else {
                newOutPutRow.push(rowKey);
                newOutPutRow.push(player[rowKey]);
                output[rowIndex] = newOutPutRow;
            }
        });
    });
    console.log(output);
    return output;
}

let generateTable = (rows) => { 
    let headers = "";
    let body = "";
    rows.forEach((row, rowIndex) => {
        let tds = "";
        row.forEach((columnValue, columIndex) => {
            //If it's the first column and the first row
            if (rowIndex == 0 && columIndex == 0) {
                tds += ` <th>
                            <div class="city-parent">
                                <div class="icon city"></div>
                            </div>
                        </th>`;
            }
            //If it's a header
            else if (rowIndex === 0) {
                tds += ` <th>${columnValue}</th>`;
            }
            //If it's the first column add class to render icons
            else if (columIndex == 0) {
                tds += `<td> <div class="icon ${columnValue}"></div> </td>`
            }
            else {
                tds += `<td>${columnValue}</td>`;
            }           
        });
        
        body += `<tr>${tds}</tr>`;
    });

    let table = `<table class="score-table center-component">
                    <tbody>
                    ${body}
                    </tbody>
                </table>`
                ;

    console.log(table);
    return table;
}




/*
let generateTable = (rows) => {
    let table = "";
    rows.forEach(columns => {
        let tds = "";
        columns.forEach(value => {
            tds += `
                <td>
                    <div class='icon armyPawn'></div>
                    <span>${value}</span>
                </td>`
        });

        let tr = `<tr>${tds}</tr>`;
        table += tr;
    });
    console.log(table);
}
*/