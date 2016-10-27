import React, { Component } from 'react';

import classNames from 'classnames'

export default class CategoryButton extends Component {
  constructor(props) {
    super(props)
    
    this._onClick = this._onClick.bind(this)
  }
  _onClick() {
    this.props.onCategoryButtonClick(this.props.categoryId)
  }
  render() {    
    return (
      <button 
        className={classNames('btn', 'btn-lg', 'btn-default', {active: this.props.selected})}
        onClick={this._onClick}>
          {this.props.text}
      </button>
    );
  }
}
