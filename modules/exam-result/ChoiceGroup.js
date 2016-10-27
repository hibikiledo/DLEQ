import React from 'react'
import Choice from './Choice'

export default React.createClass({
	render() {
		let choices = this.props.choices.map((choice, i) => {
				return <Choice 
							key={i}
							choiceNo={i}
							choice={choice}
							selected={i === this.props.answeredChoiceNo}					
							onChoiceClick={this._onChoiceClick} />
		})
		return (
			<div className="list-group">
				{choices}
			</div>
		)
	}
})