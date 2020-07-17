/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Photo } from '../photo/photo';

import './detail-table.scss';

class DetailTable extends React.Component {
  render () {
    const { gameDetail, room } = this.props;
    return (this.generateTable(gameDetail));
  };

  formatScoreCards (gameDetail) {
    const scoreCards = [];
    gameDetail.forEach((player) => {
      const scoreCard = player.scores;
      scoreCard.username = player.player;
      scoreCards.push(scoreCard);
    });
    const rows = this.merge(scoreCards);
    return rows;
  };

  merge (players) {
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
            <th>
              <div className="city-parent">
                <div className="icon city"></div>
              </div>
            </th>
          );
        }
        //  If it's a header
        else if (rowIndex === 0) {
          // tds.push(<th>{columnValue}</th>);
          tds.push(
            <th className=''>
              <Photo room= {room} playerName={columnValue} classes={'center-component small-photo'}></Photo>
            </th>);
        }
        //  If it's the first column add class to render icons
        else if (columIndex === 0) {
          const classes = 'icon ' + columnValue;
          tds.push(<td><div className={classes}></div></td>);
        }
        else {
          tds.push(<td>{columnValue}</td>);
        }
      });
      body.push(<tr>{tds}</tr>);
    });
    return body;
  };
}

DetailTable.propTypes = {
  gameDetail: PropTypes.array.isRequired,
  room: PropTypes.object.isRequired
};

export { DetailTable };
