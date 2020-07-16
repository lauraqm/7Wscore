import React from 'react';
import moment from 'moment';
import find from 'lodash-es/find';
import filter from 'lodash-es/filter';
import PropTypes from 'prop-types';
import { Photo } from '../photo/photo';
import { Utils } from '../../services/utils';

import './game.scss';

class Game extends React.Component {
  render () {
    const { game, room, eventClick } = this.props;
    const formattedDate = moment.unix(game.createdOn.seconds).format('DD/MM/yyyy');
    Utils.sortPlayers(game.scoreCards);
    const classes = (eventClick) ? 'game-component pointer' : 'game-component';
    return (
      <div className={classes} onClick={() => eventClick(game.id, room.id)} >
        <div className="game-date-players">
          <div className="bold-style">{formattedDate}</div>
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
  let iconClass;
  const { game, room } = props;
  let winnerCount = 1; // Default because the most common it's just 1 winner
  const players = game.scoreCards;
  //  The first player always is the highest score
  const highestScore = players[0].score;
  winnerCount = filter(players, { score: highestScore }).length;

  switch (game.victoryType) {
    case 'army':
      iconClass = 'army-icon';
      break;
    case 'science':
      iconClass = 'science-icon';
      break;
    //  Victory points is the most common value
    default:
      iconClass = 'civilian-icon';
      break;
  }

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

function WinnerContainer (props) {
  const { room, players, winnerCount } = props;
  let img;
  let colorStyleTriangle = {};
  let colorStyleFigure = {};

  //  Multiple winners
  if (winnerCount > 2) {
    img = <div className="photo-component photo player-photo-result multiWinnerIcon center-contain">+{winnerCount}</div>;
  }
  //  Two winners
  else if (winnerCount === 2) {
    const [player1, player2] = players;
    const photo1 = <Photo room={room} playerName={player1.username} classes={'player-photo-result first-player-photo-overlap'}></Photo>;
    const photo2 = <Photo room={room} playerName={player2.username} classes={'player-photo-result second-player-photo-overlap'}></Photo>;
    img = <div>{photo1}{photo2}</div>;
  }
  //  Just 1 winner
  else {
    const result = find(room.players, { username: players[0].username });
    colorStyleTriangle = { borderBottomColor: result.color };
    colorStyleFigure = { backgroundColor: result.color };
    const photo = <Photo room={room} playerName={players[0].username} classes={'player-photo-result first-player-photo'}></Photo>;
    img = <div>{photo}</div>;
  }

  return (
    <div className="flex-container">
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
