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

import { IGame } from "../../model/IGame";
import { IRoom } from "../../model/IRoom";

class GameList extends React.Component<GameListProps, GameListState> {
  constructor (props:GameListProps) {
    super(props);
    this.state = {
      games:[],
      room: undefined
    };
  }

  componentDidMount () {
    const roomId:any = Utils.getURLParams('roomId');
    this.getRoomData(roomId);
  };

  getRoomData (roomId : string) {
    const getRoom = roomService.getRoom(roomId);
    const getGames = gameService.getGamesByRoom(roomId);
    Promise.all([getRoom, getGames]).then((result) => {
      const [room, games] = result;
      this.setState({ room: room });
      //  setTimeout(function () {
      this.setState({ games: games });
      //  }, 2000);
      ;
    });
  };

  showGameData (gameId:string, roomId:string) {
    const params = Utils.buildQueryURL({ gameId, roomId });
    window.location.href = `game-detail-view.html?${params}`;
  };

  render () {
    if (this.state.games === null || this.state.games.length=== 0) {
      return <Loading type={'rome'}></Loading>;
    }
    else {
      if(this.state.room) {
        const playerNames = Utils.getPlayersDataByProperty(this.state.room, 'username');
        return (
          <div>
            <Title underline={true} compound={true} elements={playerNames}></Title>
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
  }
};

type GameListProps = {};
/// Types definition
type GameListState = {
  games: IGame[],
  room: undefined | IRoom
}


ReactDOM.render(<GameList />, document.getElementById('games-view'));
