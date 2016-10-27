import React from 'react'
import classNames from 'classNames'

export default React.createClass({
	render() {
		let classes = classNames(
			'list-group-item',
			'choice',
			{ active: this.props.selected },
			{ 'active correct-choice': this.props.choice.correct && !this.props.selected}
		)
		return (
			<a className={classes}>{this.props.choice.text}</a>
		)
	}
})