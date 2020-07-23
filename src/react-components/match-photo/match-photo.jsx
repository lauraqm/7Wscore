import React from 'react';
import PropTypes from 'prop-types';
import { Photo } from '../photo/photo';
import { Utils } from '../../services/utils';
import './match-photo.scss';

class MatchPhoto extends React.Component {
  render () {
    const room = this.props.room;
    return (
      <div className="match-photos">
        {
          room.players.map((player, index) => {
            const playerData = Utils.buildPlayerObjectFromRoom(room, player.username);
            return <Photo key={playerData.username} player={playerData} ></Photo>;
          })
        }
      </div>
    );
  }
};

MatchPhoto.propTypes = {
  room: PropTypes.object.isRequired
};

export { MatchPhoto };
