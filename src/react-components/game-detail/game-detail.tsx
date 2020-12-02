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
import { IRoom } from '../../model/IRoom';
import { IGame } from '../../model/IGame';
import { IScoreCard } from '../../model/IScoreCard';


class GameDetail extends React.Component<GameProps, GameState> {
  constructor (props:GameProps) {
    super(props);
    this.state = {
      room: undefined,
      game: undefined,
      scoreCards: undefined
    };
  }

  componentDidMount () {
    let params : (string | null)[] | string | null;
    params = Utils.getURLParams(['gameId', 'roomId']);
    const [gameId, roomId] : any = params;
    this.getData(gameId, roomId);
  };

  getData (gameId:string, roomId:string) {
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
    if (this.state.game === null || undefined) {
      return <Loading type={'egypt'}></Loading>;
    }
    else {
      if(this.state.room) {
        const room : IRoom = this.state.room;
        const playerNames = Utils.getPlayersDataByProperty(room, 'username');
        let gameId = this.state.game?.id;
        return (
          <div>
            <Title underline={true} compound={true} elements={playerNames}></Title>
            <Game key={gameId} game={this.state.game} room={this.state.room}></Game>
            <DetailTable gameDetail={this.state.scoreCards} room= {this.state.room}></DetailTable>
          </div>
        );
      }
      else return null;
    }
  }
}

type GameProps = {};
/// Types definition
type GameState = {
  room: undefined | IRoom
  game: undefined | IGame
  scoreCards: undefined | IScoreCard[]
}


ReactDOM.render(<GameDetail/>, document.getElementById('game-detail'));
