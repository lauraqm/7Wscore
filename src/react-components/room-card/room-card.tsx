import React from 'react';
import { Utils } from '../../services/utils';
import { Title } from '../title/title';
import { MatchPhoto } from '../match-photo/match-photo';
import { IRoom } from "../../model/IRoom";
import './room-card.scss';

const cardClass = ['blue-room', 'green-room', 'yellow-room', 'purple-room'];

const RoomCard = (props: RoomCardProps) => {
  const { room, count, onClick } = props;
  const indexClass = count % cardClass.length;
  const classCard = 'room-card pointer ' + cardClass[indexClass];
  const playerNames = Utils.getPlayersDataByProperty(room, 'username');
  return (
    <div className={classCard} onClick={onClick}>
      <Title specialClass={'small-title'} underline={false} compound={true} elements={playerNames}></Title>
      <div className='leaves-illustration'></div>
      <div>
        {<MatchPhoto room={room} ></MatchPhoto>}
        <div className='boardgame'>{room.boardGame}</div>
      </div>
    </div>
  );
};


const NewRoomCard = (props: {}) => {
  return (
    <div className = 'pointer room-card new-room'>
      <div className='plus'>+</div>
      <div>New room</div>
    </div>
  );
};

type RoomCardProps = {room: IRoom, count: number, onClick: () => void}


export {RoomCard, NewRoomCard} ;