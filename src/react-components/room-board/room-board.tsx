import React from 'react';
import ReactDOM from 'react-dom';
import { roomService } from '../../services/room-service';
import { Title } from '../title/title';
import { NewRoomCard, RoomCard } from '../room-card/room-card';
import { IRoom } from "../../model/IRoom";
import './room-board.scss';
import '../../general-styles/reset-css.scss';
import '../../general-styles/styles.scss';

class RoomBoard extends React.Component<RoomBoardProps, RoomBoardState>{
  constructor (props: RoomBoardProps) {
    super(props);
    this.state = {
      rooms: []
    };
  }

  componentDidMount () {
    roomService.getAllRooms()
      .then((rooms) => {
        this.setState({ rooms: rooms });
      });
  };

  createRoom (room: IRoom, index:number) {
    if (room) {
      return (
        <RoomCard
          key={room.id}
          room={room}
          count={index}
          onClick={ ()=> { this.showGames(room.id) }}
        />
      );
    }
  }
  showGames = (roomId: string) : void =>{
    window.location.href = `games-view.html?roomId=${roomId}`;
  };
  

  render () {
    return (
      <div>
        {<Title underline={true} title={'Rooms'}></Title>}
        {
          this.state.rooms.map((room, index) => { //  Iterate in the room's array and return a new array with renderRoom output
            return this.createRoom(room, index);
          })
        }
        {<NewRoomCard/>}
      </div>
    );
  };
}

/// Types definition
type RoomBoardState = {
  rooms: IRoom[]
}
type RoomBoardProps = {};


export default RoomBoard;

ReactDOM.render(<RoomBoard />, document.getElementById('room-view'));
