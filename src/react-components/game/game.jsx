import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import filter from 'lodash-es/filter';
import isNil from 'lodash-es/isNil';
import PropTypes from 'prop-types';
import { Photo } from '../photo/photo';
import { Utils } from '../../services/utils';

import './game.scss';

/***
 * Props:
 * @param   {Object}    room          Room to get photo's URLs
 * @param   {Object}    game          Score details for each player
 * @param   {Function}  eventClick
 * @returns {Object}  Return React Table Score component
 */

class Game extends React.Component {
  render () {
    const { game, room, eventClick } = this.props;
    const formattedDate = moment.unix(game.createdOn.seconds).format('DD/MM/yyyy');
    Utils.sortArrayByProperty(game.scoreCards, 'score');
    const classes = classNames(
      'game-component',
      { pointer: !isNil(eventClick) }
    );

    return (
      <div className={classes} onClick={() => eventClick(game.id, room.id)} >
        <div className="game-date-players">
          <div className="game-date">{formattedDate}</div>
          <div>
            {
              game.scoreCards.map(player => {
                return (
                  <div className='player' key={player.username}>
                    {player.username}: {player.score}
                  </div>);
              })
            }
          </div>
        </div>
        <WinnerData game={game} room={room}></WinnerData>
      </div>
    );
  }
}

function WinnerData (props) {
  const { game, room } = props;
  const players = game.scoreCards;
  const winnerCount = getCountWinners(players);

  const icons = {
    army: 'army-icon',
    science: 'science-icon',
    civilian: 'civilian-icon'
  };
  const iconClass = icons[game.victoryType];
  const classes = `winner-icon ${iconClass}`;

  return (
    <React.Fragment>
      <div className={classes}></div>
      <WinnerContainer
        room={room}
        players={players}
        winnerCount={winnerCount}>
      </WinnerContainer>
    </React.Fragment>
  );
};

const getCountWinners = (scoreCards) => {
  let winnerCount = 1; // Default because the most common it's just 1 winner
  //  The first player always is the highest score
  const highestScore = scoreCards[0].score;
  winnerCount = filter(scoreCards, { score: highestScore }).length;
  return winnerCount;
};

function WinnerContainer (props) {
  const { room, players, winnerCount } = props;
  let img;
  let colorStyleTriangle = {};
  let colorStyleFigure = {};

  //  Multiple winners
  if (winnerCount > 2) {
    img = <Photo numericValue={winnerCount}></Photo>;
  }
  //  Two winners
  else if (winnerCount === 2) {
    const photos = [];
    players.forEach((element, index) => {
      const dataPlayer = Utils.buildPlayerObjectFromRoom(room, element.username);
      photos.push(<Photo key={index} player={dataPlayer}></Photo>);
    });
    img = photos;
  }
  //  Just 1 winner
  else {
    const [player] = players;
    const dataPlayer = Utils.buildPlayerObjectFromRoom(room, player.username);
    colorStyleTriangle = { borderBottomColor: dataPlayer.color };
    colorStyleFigure = { backgroundColor: dataPlayer.color };
    const photo = <Photo player={dataPlayer}></Photo>;
    img = photo;
  }

  return (
    <div className="winner-wrapper">
      <div className="triangle" style={colorStyleTriangle}></div>
      <div className="figure" style={colorStyleFigure}>{img}</div>
    </div>
  );
};

Game.propTypes = {
  game: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired,
  eventClick: PropTypes.func
};

WinnerData.propTypes = {
  game: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired
};

WinnerContainer.propTypes = {
  room: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired,
  winnerCount: PropTypes.number.isRequired
};

export { Game };
