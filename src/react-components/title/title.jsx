import React from 'react';
import PropTypes from 'prop-types';

import './title.scss';

/***
 * Props:
 * @param   {boolean} underline         Flag to specify if the component should return a single title or with underline
 * @param   {boolean} compound          Flag that indicates if it will be a compount title by elements and separators
 * @param   {Object}  elements          Elements in case compound title
 * @param   {string}  separator         Separator in case compound title
 * @param   {string}  title             Title in case of single title
 * @param   {string}  specialClass      Css class aditional if its neccesary
 * @returns {Object}  Return a title component
 */

class Title extends React.Component {
  render () {
    let title = this.props.title;
    if (this.props.compound) {
      title = <CompoundTitle elements={this.props.elements} separator={this.props.separator}></CompoundTitle>;
    }

    if (this.props.underline) {
      return (
        <div className={this.props.specialClass}>
          <div className='main-title'>{title}</div>
          <div className="underline-tittle">
            <div className="circle-tittle"></div>
            <div className="line-tittle"></div>
            <div className="circle-tittle"></div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className={this.props.specialClass}>{title}</div>
      );
    }
  }
};

/**
 * Create a compound title with elements and separators
 * @param {Array} elements  Array with all elements to concatenate
 * @param {String} separator  Separator between elements
 */
function CompoundTitle (props) {
  const { elements, separator = 'vs' } = props;
  const title = [];
  elements.forEach((element, index) => {
    if (title.length > 0 && separator) {
      title.push(<span className='small-separator' key={index + 'sep'}>{separator}</span>);
    }
    title.push(<span key={index}> {element} </span>);
  });
  return title;
}

Title.propTypes = {
  underline: PropTypes.bool.isRequired,
  compound: PropTypes.bool,
  elements: PropTypes.array,
  separator: PropTypes.string,
  title: PropTypes.string,
  specialClass: PropTypes.string
};

export { Title };
