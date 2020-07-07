import React from 'react';
import PropTypes from 'prop-types';
import './photo.scss';

class Photo extends React.Component {
  render () {
    const url = this.getPhoto(this.props.room, this.props.playerName);
    if (url) {
      const style = { backgroundImage: `url('${url}')` };
      const classes = `photo-component photo ${this.props.classes}`;
      return (<div className={classes} style={style}></div>);
    }
    else {
      const firstLetter = this.props.playerName.charAt();
      const color = this.getColor(this.props.room, this.props.playerName);
      const style = { backgroundColor: color };
      const classes = `photo-component photo letter ${this.props.classes}`;
      return (<div className={classes} style={style}>{ firstLetter }</div>);
    };
  }

  getPhoto (room, playerName) {
    const roomPlayerData = room.players.filter(player => {
      return player.username === playerName;
    });
    return roomPlayerData[0].pictureUrl;
  }

  getColor (room, playerName) {
    const roomPlayerData = room.players.filter(player => {
      return player.username === playerName;
    });
    return roomPlayerData[0].color;
  };
};

Photo.propTypes = {
  room: PropTypes.object.isRequired,
  playerName: PropTypes.string.isRequired,
  classes: PropTypes.string
};

export { Photo };
