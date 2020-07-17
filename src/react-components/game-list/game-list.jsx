import React from 'react';
import ReactDOM from 'react-dom';
import '../../general-styles/reset-css.scss';
import '../../general-styles/styles.scss';

import { Title } from '../title/title';
import { MatchPhoto } from '../match-photo/match-photo';
import { Game } from '../game/game';
import { Loading } from '../loading/loading';

import { roomService } from '../../services/room-service';
import { gameService } from '../../services/game-service';
import { Utils } from '../../services/utils';

class GameList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      games: null,
      room: {}
    };
  }

  componentDidMount () {
    const roomId = Utils.getURLParams('roomId');
    this.getRoomData(roomId);
  };

  getRoomData (roomId) {
    const currentComponent = this;
    const getRoom = roomService.getRoom(roomId);
    const getGames = gameService.getGamesByRoom(roomId);
    Promise.all([getRoom, getGames]).then((result) => {
      const [room, games] = result;
      currentComponent.setState({ room: room });
      const collection = [];
      games.forEach(game => {
        collection.push(game);
      });
      //  setTimeout(function () {
      currentComponent.setState({ games: collection });
      //  }, 2000);
      ;
    });
  };

  showGameData (gameId, roomId) {
    window.location.href = `game-detail-view.html?gameId=${gameId}&roomId=${roomId}`;
  };

  render () {
    if (this.state.games === null) {
      return <Loading cardsClass={'rome'}></Loading>;
    }
    else {
      return (
        <div>
          <Title singleRoomTitle={false} room={this.state.room} ></Title>
          <MatchPhoto room={this.state.room} ></MatchPhoto>
          <div className='center-component-flex'>
            <div className='primary-button'>Stats</div>
            <div className="primary-button">+ New game</div>
          </div>
          {
            this.state.games.map(game => {
              return <Game key={game.id} game={game} room={this.state.room} eventClick = {this.showGameData}></Game>;
            })
          }
        </div>
      );
    }
  }
};

ReactDOM.render(<GameList />, document.getElementById('games-container'));
