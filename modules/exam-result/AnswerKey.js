import React from 'react'

export default React.createClass({
	render() {
		return (
			<div className="answer-key">
				<div className="well well-sm">
					{this.props.text}
				</div>
			</div>
		)
	}
})