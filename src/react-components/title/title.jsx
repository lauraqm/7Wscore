import React from 'react';
import PropTypes from 'prop-types';

import './title.scss';

class Title extends React.Component {
  render () {
    return (
      <div className='title-view'>
        <div className='main-title'>{this.props.tittle}</div>
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
    let title = '';
    const players = room.players;
    players.forEach(element => {
      const name = element.username;
      if (title !== '') {
        title = title + `<span class='vs-title'> vs </span> <span class='title'>${name}</span>`;
      }
      else {
        title = title + `<span class='title'>${name}</span>`;
      }
    });
    return (<div className='title' dangerouslySetInnerHTML= {{ __html: title }}></div>);
  }
};

Title.propTypes = {
  tittle: PropTypes.string.isRequired
};

TitleRoom.propTypes = {
  room: PropTypes.object.isRequired
};

export { Title, TitleRoom };
