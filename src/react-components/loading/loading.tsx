import React from 'react';
import PropTypes from 'prop-types';
import './loading.scss';

class Loading extends React.Component<LoadingProps> {
  render () {
    const type = this.props.type || 'rome';
    const classes = `center-component flip-card ${type}`;
    return (
      <div className='loading-component'>
        <div className='loading-wrapper'>
          <div id='card' className={classes}></div>
          <div className='center-contain loading-text-container'>
            <div className='first-dot'>.</div>
            <div className='second-dot'>.</div>
            <div className='third-dot'>.</div>
          </div>
        </div>
      </div>
    );
  }
}
type LoadingProps = {
  type: string;
};



export { Loading };
