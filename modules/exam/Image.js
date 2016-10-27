import React from 'react'

export default React.createClass({
  render() {
    return (
      <img src={this.props.imageUrl} style={{maxWidth: "40%"}} />
    )
  }
})