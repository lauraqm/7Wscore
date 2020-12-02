import React from 'react';
import PropTypes from 'prop-types';
import { Photo } from '../photo/photo';
import { Utils } from '../../services/utils.ts';

import './detail-table.scss';

/***
 * Props:
 * @param   {Object}  room          Room to get photo's URLs
 * @param   {array}   gameDetail     Score details for each player
 * @returns {Object}  Return React Table Score component
 */

class DetailTable extends React.Component {
  render () {
    const gameDetail = this.props.gameDetail;
    return (this.generateTable(gameDetail));
  };

  formatScoreCards (gameDetail) {
    const scoreCards = [];
    gameDetail.forEach((player) => {
      const scoreCard = player.scores;
      scoreCard.username = player.player;
      scoreCards.push(scoreCard);
    });
    const rows = this.createMatrix(scoreCards);
    return rows;
  };

  createMatrix (players) {
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

  generateTable (detail) {
    const rows = this.formatScoreCards(detail);
    return (
      <div className="detail-table">
        <table className="score-table center-component">
          <tbody>
            {this.generateBody(rows)}
          </tbody>
        </table>
      </div>
    );
  };

  generateBody (rows) {
    const room = this.props.room;
    const body = [];
    rows.forEach((row, rowIndex) => {
      const tds = [];
      row.forEach((columnValue, columIndex) => {
        //  If it's the first column and the first row
        if (rowIndex === 0 && columIndex === 0) {
          tds.push(
            <th key={columIndex}>
              <div className="city-parent">
                <div className="icon city"></div>
              </div>
            </th>
          );
        }
        //  If it's a header/player's photo
        else if (rowIndex === 0) {
          const playerData = Utils.buildPlayerObjectFromRoom(room, columnValue);
          tds.push(
            <th key={columIndex}>
              <Photo className='center-component' player={playerData} isSmallSize={true}></Photo>
            </th>);
        }
        //  If it's the first column add class to render icons
        else if (columIndex === 0) {
          const classes = 'icon ' + columnValue;
          tds.push(<td key={columIndex}><div className={classes}></div></td>);
        }
        else {
          tds.push(<td key={columIndex}>{columnValue}</td>);
        }
      });
      body.push(<tr key={rowIndex}>{tds}</tr>);
    });
    return body;
  };
}

DetailTable.propTypes = {
  gameDetail: PropTypes.array.isRequired,
  room: PropTypes.object.isRequired
};

export { DetailTable };
