import React, { Component, ReactComponentElement } from 'react';

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

class Title extends React.Component<TitleProps> {
  render () {
    let {title, separator, elements} = this.props;
    if (this.props.compound) {
      title = <CompoundTitle elements={elements} separator={separator}></CompoundTitle>;
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
function CompoundTitle (props:CompoundTitleProps) {
  const { elements, separator = 'vs' } = props;
  let title: JSX.Element[]= [];
  if (elements){
    elements.forEach((element, index) => {
      if (title.length > 0 && separator) {
        title.push(<span className='small-separator' key={index + 'sep'}>{separator}</span>);
      }
      title.push(<span key={index}> {element} </span>);
    });
  }
  return <div>{title}</div>;
}




type TitleProps = {
  compound?: boolean;
  underline?:boolean;
  elements?: string[] | undefined;
  separator?: string;
  title?: string | JSX.Element | JSX.Element[];
  specialClass?: string;
} ;

type CompoundTitleProps = {
  elements?: string[];
  separator?: string;
};

export { Title };
