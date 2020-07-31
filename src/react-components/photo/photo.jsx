import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './photo.scss';

/***
 * Props:
 * @param   {object}  player        Object that contains neccesary data from one player
 * @param   {string}  numericValue  The value in case of the content be a number
 * @param   {string}  isSmallSize   Flag that indicates if the photo is small
 * @param   {string}  className     Additional CSS classes
 * @returns {Object}  Return React Photo component
 */

class Photo extends React.Component {
  render () {
    const { player, className, isSmallSize, numericValue } = this.props;
    const classes = classNames(
      'photo',
      className,
      { 'text-photo': numericValue || !player.url },
      { 'numeric-photo': numericValue },
      { 'small-photo': isSmallSize }
    );

    let content, style;
    // If it's a number
    if (numericValue) {
      content = `+${numericValue}`;
    }
    // If it's a photo
    else if (player.url) {
      style = { backgroundImage: `url('${player.url}')` };
    }
    // If it is not a photo this take the first letter of the player
    else {
      style = { backgroundColor: player.color };
      content = player.username.charAt();
    };

    return (<div className={classes} style={style}>{ content }</div>);
  }
};

Photo.propTypes = {
  numericValue: PropTypes.number,
  player: PropTypes.object,
  className: PropTypes.string,
  isSmallSize: PropTypes.bool
};

export { Photo };
