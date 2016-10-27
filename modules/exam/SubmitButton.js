import React from 'react'

export default React.createClass({
  _onClick() {
    this.props.onClick()
  },
  render() {
    return (
      <div className="row submit-button">
        <div className="col-md-6 col-md-offset-3">
          <div className="text-right">
            <button className="btn btn-lg btn-success" onClick={this._onClick}>{this.props.text}</button>
          </div>
        </div>
      </div>
    )
  }
})
