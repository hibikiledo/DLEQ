import React from 'react'
import classNames from 'classnames'

export default React.createClass({
  _onClick() {
    this.props.onChoiceClick(this.props.choiceNo)
  },
  render() {
    let classes = classNames('list-group-item', 'choice', { active: this.props.selected })
    return (
      <a className={classes} onClick={this._onClick}>{this.props.choice.text}</a>
    )
  }
})