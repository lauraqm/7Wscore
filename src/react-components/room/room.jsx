import React from 'react';
import ReactDOM from 'react-dom';
import { Utils } from '../../services/utils';
import { roomService } from '../../services/room-service';
import { Title } from '../title/title';
import { MatchPhoto } from '../match-photo/match-photo';
import './room.scss';
import '../../general-styles/reset-css.scss';
import '../../general-styles/styles.scss';

const cardClass = ['blue-room', 'green-room', 'yellow-room', 'purple-room'];

class RoomBoard extends React.Component {
  constructor (props) {
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

  renderRoom (room, index) {
    return (
      <Room
        key={room.id}
        room={room}
        count={index}
        onClick={() => { this.showGames(room.id) }}
      />
    );
  }

  render () {
    return (
      <div>
        {<Title underline={true} title={'Rooms'}></Title>}
        {
          this.state.rooms.map((room, index) => { //  Iterate in the room's array and return a new array with renderRoom output
            return this.renderRoom(room, index);
          })
        }
        {<NewRoomCard/>}
      </div>
    );
  };
}

function Room (props) {
  const { room, count } = props;
  if (room) {
    const indexClass = count % cardClass.length;
    const classCard = 'room-card pointer ' + cardClass[indexClass];
    const playerNames = Utils.getPlayersDataByProperty(room, 'username');
    return (
      <div className={classCard} onClick={() => showGames(room.id)}>
        <Title specialClass={'small-title'} underline={false} compound={true} elements={playerNames}></Title>
        <div className='leaves-illustration'></div>
        <div>
          {<MatchPhoto room={room} ></MatchPhoto>}
          <div className='boardgame'>{room.boardGame}</div>
        </div>
      </div>
    );
  }
}

const NewRoomCard = (props) => {
  return (
    <div className = 'pointer room-card new-room'>
      <div className='plus'>+</div>
      <div>New room</div>
    </div>
  );
};

const showGames = (roomId) => {
  window.location.href = `games-view.html?roomId=${roomId}`;
};

export default RoomBoard;

ReactDOM.render(<RoomBoard />, document.getElementById('room-view'));
