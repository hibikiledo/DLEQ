import React from 'react'

import QuestionText from './QuestionText'
import ChoiceGroup from './ChoiceGroup'
import ImageList from './ImageList'
import AnswerKey from './AnswerKey'

export default React.createClass({
	render() {
		return (
			<div className="row wrong-question">
				<div className="col-md-6 col-md-offset-3">
					<QuestionText text={this.props.question.question} />
					<ImageList images={this.props.question.images} />
					<ChoiceGroup 
						choices={this.props.question.choices}
						answeredChoiceNo={this.props.answeredChoiceNo} />
					<AnswerKey text={this.props.question.answer} />					
				</div>
			</div>
		)
	}
})