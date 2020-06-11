import { Utils } from '../../services/utils.js';

import './detail-table-component.scss';

export const create = (gameDetail) => {
  return createTable(gameDetail);
};

const createTable = (gameDetail) => {
  const scoreCards = [];
  gameDetail.forEach((player) => {
    const scoreCard = player.scores;
    scoreCard.username = player.player;
    scoreCards.push(scoreCard);
  });

  const rows = merge(scoreCards);
  const table = generateTable(rows);
  return Utils.htmlToElement(table);
};

const merge = (players) => {
  const rows = ['username', 'civilian', 'scientific', 'commercial', 'guild', 'wonders', 'progress', 'coins', 'military', 'total'];
  const output = [];
  players.forEach((player) => {
    rows.forEach((rowKey, rowIndex) => {
      const newOutputRow = [];
      if (output[rowIndex]) {
        output[rowIndex].push(player[rowKey]);
      }
      else {
        newOutputRow.push(rowKey);
        newOutputRow.push(player[rowKey]);
        output[rowIndex] = newOutputRow;
      }
    });
  });
  return output;
};

const generateTable = (rows) => {
  let body = '';
  rows.forEach((row, rowIndex) => {
    let tds = '';
    row.forEach((columnValue, columIndex) => {
      //  If it's the first column and the first row
      if (rowIndex === 0 && columIndex === 0) {
        tds += ` <th>
                            <div class="city-parent">
                                <div class="icon city"></div>
                            </div>
                        </th>`;
      }
      //  If it's a header
      else if (rowIndex === 0) {
        tds += ` <th>${columnValue}</th>`;
      }
      //  If it's the first column add class to render icons
      else if (columIndex === 0) {
        tds += `<td><div class="icon ${columnValue}"></div></td>`;
      }
      else {
        tds += `<td>${columnValue}</td>`;
      }
    });

    body += `<tr>${tds}</tr>`;
  });

  const table = `<div class="detail-table">
                    <table class="score-table center-component">
                        <tbody>
                        ${body}
                        </tbody>
                    </table>
                </div>`
    ;
  return table;
};
