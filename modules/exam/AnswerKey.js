import React from 'react'

import classNames from 'classnames'

export default React.createClass({
  getInitialState() {
    return {
      show: false
    }
  },
  _onClick() {
    this.setState({show: !this.state.show})
  },
  render() {
    let wellClasses = classNames(
      'well',
      'well-sm',
      {hidden: !this.state.show}
    )
    return (
      <div className="answer-key">
        <button className="btn btn-info" onClick={this._onClick}>
          {this.state.show ? 'ปิดเฉลย' : 'เปิดเฉลย'}
        </button>
        <div className={wellClasses}>
          {this.props.text}
        </div>
      </div>
    )
  }
})