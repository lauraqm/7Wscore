import React from 'react';
import PropTypes from 'prop-types';
import './photo.scss';

/***
 * Props:
 * @param   {object}  player        Object that contains neccesary data from one player
 * @param   {string}  classes       CSS classes to apply to Photo component
 * @returns {Object}  Return React Photo component
 */

class Photo extends React.Component {
  render () {
    const player = this.props.player;
    if (player.url) {
      const style = { backgroundImage: `url('${player.url}')` };
      const classes = `photo-component photo ${this.props.classes}`;
      return (<div className={classes} style={style}></div>);
    }
    else {
      const firstLetter = player.username.charAt();
      const style = { backgroundColor: player.color };
      const classes = `photo-component photo letter ${this.props.classes}`;
      return (<div className={classes} style={style}>{ firstLetter }</div>);
    };
  }
};

Photo.propTypes = {
  player: PropTypes.object.isRequired,
  classes: PropTypes.string
};

export { Photo };
