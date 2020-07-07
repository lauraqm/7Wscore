import React from 'react';
import PropTypes from 'prop-types';

import './title.scss';

class Title extends React.Component {
  render () {
    return (
      <div className='title-view'>
        <div className='main-title'>{this.props.title}</div>
        <div className="underline-tittle">
          <div className="circle-tittle"></div>
          <div className="line-tittle"></div>
          <div className="circle-tittle"></div>
        </div>
      </div>
    );
  }
};

class TitleRoom extends React.Component {
  render () {
    const room = this.props.room;
    const title = [];
    const players = room.players;
    players.forEach((element, index) => {
      const name = element.username;
      if (title.length > 0) {
        title.push(<span className='vs-title-room' key={index + 'vs'}> vs </span>);
      }
      title.push(<span className='title' key={index}>{name}</span>);
    });
    return (<div className='title-room'>{ title }</div>);
  }
};

Title.propTypes = {
  title: PropTypes.string.isRequired
};

TitleRoom.propTypes = {
  room: PropTypes.object.isRequired
};

export { Title, TitleRoom };
