import React from 'react'

export default React.createClass({
  render() {
    return (
      <h3 className="question-text">{this.props.text}</h3>
    )
  }
})