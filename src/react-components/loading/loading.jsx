import React from 'react';
import PropTypes from 'prop-types';
import './loading.scss';

class Loading extends React.Component {
  render () {
    const classes = `center-component flip-card ${this.props.cardsClass}`;
    return (
      <div className='loading-component'>
        <div className='loading-wrapper'>
          <div id='card' className={classes}></div>
          <div className='center-contain loading-text-container'>
            <div className='first-dot roll-in-blurred-bottom'>.</div>
            <div className='second-dot roll-in-blurred-bottom'>.</div>
            <div className='third-dot roll-in-blurred-bottom'>.</div>
          </div>
        </div>
      </div>
    );
  }
}

Loading.propTypes = {
  cardsClass: PropTypes.string.isRequired
};

export { Loading };
