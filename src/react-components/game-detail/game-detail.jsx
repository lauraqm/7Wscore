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
    const roomPromise = roomService.getRoom(roomId);
    const gamePromise = gameService.getGame(roomId, gameId);
    const scoreCardPromise = gameService.getScoreCards(roomId, gameId);
    Promise.all([roomPromise, gamePromise, scoreCardPromise]).then((promiseResults) => {
      const [room, game, scoreCards] = promiseResults;
      //  setTimeout(function () {
      this.setState({ game: game, room: room, scoreCards: scoreCards });
      //  }, 2000);
    });
  };

  render () {
    if (this.state.game === null) {
      return <Loading type={'egypt'}></Loading>;
    }
    else {
      const playerNames = Utils.getPlayersDataByProperty(this.state.room, 'username');
      return (
        <div>
          <Title underline={true} compound={true} elements={playerNames}></Title>
          <Game key={this.state.game.id} game={this.state.game} room={this.state.room}></Game>
          <DetailTable gameDetail={this.state.scoreCards} room= {this.state.room}></DetailTable>
        </div>
      );
    }
  }
}

ReactDOM.render(<GameDetail/>, document.getElementById('game-detail'));
