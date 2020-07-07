import React from 'react';
import PropTypes from 'prop-types';
import { Photo } from '../photo/photo';
import find from 'lodash-es/find';
import './match-photo.scss';

class MatchPhoto extends React.Component {
  renderPhoto (room, classes, playerName) {
    const player = find(room.players, { username: playerName });
    return (<Photo key={player.username} room={room} playerName={player.username} classes={classes}></Photo>);
  }

  render () {
    const room = this.props.room;
    return (
      <div className="match-photos">
        {
          room.players.map((player, index) => {
            let classes = 'photo-overlap';
            if (index === 0) {
              classes = 'first-overlap';
            }
            return this.renderPhoto(room, classes, player.username);
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
