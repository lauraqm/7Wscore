/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import '../../general-styles/reset-css.scss';
import '../../general-styles/styles.scss';

import { Title } from '../title/title';
import { Game } from '../game/game';
import { Loading } from '../loading/loading';

import { roomService } from '../../services/room-service';
import { gameService } from '../../services/game-service';
import { Utils } from '../../services/utils';
import { DetailTable } from '../detail-table/detail-table';

class GameDetail extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      room: null,
      game: null,
      scoreCards: null
    };
  }

  componentDidMount () {
    const params = Utils.getURLParams(['gameId', 'roomId']);
    const [gameId, roomId] = params;
    this.getData(gameId, roomId);
  };

  getData (gameId, roomId) {
    const currentComponent = this;
    const roomPromise = roomService.getRoom(roomId);
    const gamePromise = gameService.getGame(roomId, gameId);
    const scoreCardPromise = gameService.getScoreCards(roomId, gameId);
    Promise.all([roomPromise, gamePromise, scoreCardPromise]).then(function (promiseResults) {
      const [room, game, scoreCards] = promiseResults;
      currentComponent.setState({ game: game, room: room, scoreCards: scoreCards });
    });
  };

  render () {
    if (this.state.game === null) {
      return <Loading cardsClass={'rome'}></Loading>;
    }
    else {
      return (
        <div>
          <Title singleRoomTitle={false} room={this.state.room} ></Title>
          <Game key={this.state.game.id} game={this.state.game} room={this.state.room}></Game>
          <DetailTable gameDetail={this.state.scoreCards} room= {this.state.room}></DetailTable>
        </div>
      );
    }
  }
}

ReactDOM.render(<GameDetail/>, document.getElementById('game-detail'));
