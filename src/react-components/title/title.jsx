import React from 'react';
import PropTypes from 'prop-types';

import './title.scss';

/***
 * Props:
 * @param   {boolean} singleRoomTitle   Flag to specify if the component should return a single title or with underline
 * @param   {Object}  room              Room to get names and build the room name
 * @param   {string}  title             Title
 * @returns {Object}  Return React Photo component
 */

class Title extends React.Component {
  render () {
    if (this.props.singleRoomTitle) {
      return <SingleRoomTitle className={'title-room'} room = {this.props.room}></SingleRoomTitle>;
    }
    else {
      let titleContain = null;
      if (this.props.title) {
        titleContain = this.props.title;
      }
      else {
        titleContain = buildRoomName(this.props.room);
      }
      return (
        <div className='title-view'>
          <div className='main-title'>{titleContain}</div>
          <div className="underline-tittle">
            <div className="circle-tittle"></div>
            <div className="line-tittle"></div>
            <div className="circle-tittle"></div>
          </div>
        </div>
      );
    }
  }
};

class SingleRoomTitle extends React.Component {
  render () {
    const room = this.props.room;
    const title = buildRoomName(room);
    return (<div className= { this.props.className }>{ title }</div>);
  }
};

function buildRoomName (room) {
  const players = room.players;
  const title = [];
  players.forEach((element, index) => {
    const name = element.username;
    if (title.length > 0) {
      title.push(<span className='vs-title' key={index + 'vs'}> vs </span>);
    }
    title.push(<span className='title' key={index}>{name}</span>);
  });
  return title;
}

Title.propTypes = {
  singleRoomTitle: PropTypes.bool.isRequired,
  title: PropTypes.string,
  room: PropTypes.object
};

SingleRoomTitle.propTypes = {
  room: PropTypes.object.isRequired,
  className: PropTypes.string
};

export { Title };
