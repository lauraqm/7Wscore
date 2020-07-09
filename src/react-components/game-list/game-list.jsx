/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import '../../general-styles/reset-css.css';
import '../../general-styles/styles.css';

import { TitleRoom } from '../title/title';
import { MatchPhoto } from '../match-photo/match-photo';
import { Game } from '../game/game';

import { roomService } from '../../services/room-service';
import { gameService } from '../../services/game-service';
import { Utils } from '../../services/utils';

let roomObject = {};
let roomId;

class GameList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      games: null,
      room: {}
    };
  }

  componentDidMount () {
    this.getParams();
    this.getRoomData(roomId);
  };

  getParams () {
    roomId = Utils.getURLParams('roomId');
  };

  getRoomData (roomId) {
    const currentComponent = this;
    roomService.getRoom(roomId).then(function (room) {
      roomObject = room;
      gameService.getGamesByRoom(roomId).then(function (games) {
        const collection = [];
        games.forEach(game => {
          collection.push(game);
        });
        currentComponent.setState({ games: collection });
      });
    });
  };

  render () {
    if (this.state.games === null) {
      return (<div> Loading... </div>);
    }
    else {
      return (
        <div>
          <TitleRoom room={roomObject} ></TitleRoom>
          <MatchPhoto room={roomObject} ></MatchPhoto>
          <div className='primary-button'>Stats</div>
          <div className="primary-button">+ New game</div>
          {
            this.state.games.map(game => {
              return <Game key={game.id} game={game} room={roomObject}></Game>;
            })
          }
        </div>
      );
    }
  }
};

ReactDOM.render(<GameList />, document.getElementById('games-container'));
