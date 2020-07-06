import React from 'react';
import ReactDOM from 'react-dom';
import './room.scss';
import find from 'lodash-es/find';
import '../../general-styles/reset-css.css';
import '../../general-styles/styles.css';
import { roomService } from '../../services/room-service';
import { Title, TitleRoom } from '../title/title';

let count = 0;
const cardClass = ['blue-room', 'green-room', 'yellow-room', 'purple-room'];
const titleView = 'Rooms';

class RoomBoard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      rooms: []
    };
  }

  componentDidMount () {
    const currentComponent = this;
    roomService.getAllRooms()
      .then(function (rooms) {
        const collection = [];
        rooms.forEach(room => {
          collection.push(room);
        });
        currentComponent.setState({ rooms: collection });
      });
  };

  renderRoom (room) {
    const roomObject = find(this.state.rooms, room);
    return (<Room
      key={roomObject.id}
      room={roomObject}
      onClick = {() => { this.showGames(roomObject.id) }}
    />
    );
  }

  render () {
    return (
      <div>
        {<Title tittle={titleView}></Title>}
        {
          this.state.rooms.map(room => { //  Iterate in the room's array and return a new array with renderRoom output
            return this.renderRoom(room);
          })
        }
        {<NewRoomCard/>}
      </div>
    );
  };
}

function Room (props) {
  const room = props.room;
  if (room) {
    if (count === cardClass.length) {
      count = 0;
    }
    const classCard = 'room-card pointer ' + cardClass[count];
    count++;
    return (
      <div className={ classCard } onClick={() => showGames(room.id)}>
        {<TitleRoom room = {room} ></TitleRoom>}
        <div className='leaves'></div>
        <div className='boardgame'>{room.boardGame}</div>
      </div>
    );
    //  const matchPhoto = matchPhotoComponent.create(room);
    //  cardElement.appendChild(matchPhoto);
  }
}

function NewRoomCard (props) {
  return (
    <div className = 'pointer room-card new-room'>
      <div className='plus'>+</div>
      <div>New room</div>
    </div>
  );
};

function showGames (roomId) {
  window.location.href = `games-view.html?roomId=${roomId}`;
};

export default RoomBoard;

ReactDOM.render(<RoomBoard />, document.getElementById('rooms-container'));
