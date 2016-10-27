import React from 'react'

import Configuration from '../Configuration'

import Question from './Question'
import Summary from './Summary'

export default React.createClass({
	apiBaseUrl: Configuration.apiBaseUrl,
	siteBaseUrl: Configuration.siteBaseUrl,
	getInitialState() {
		return {
			questions: [],
			answers: {}
		};
	},
	componentDidMount() {
		$.ajax({
			url: `${this.apiBaseUrl}/exams/${this.props.params.examId}/results/${this.props.params.resultId}`,
			dataType: "json",
			success: (res) => {
				if (res.success) {
					this.setState(
						{
							questions: res.data.questions,
							answers: res.data.answers
						}
					);
				}
				else {
					console.log(res.reason)
				}
			}
		})
	},
	render() {
		let wrongQuestions = this.state.questions
			.filter((question) => {
				return this.state.answers[question._id] === undefined ||
							! question.choices[this.state.answers[question._id]].correct
			})
			.map((question, i) => {
			return <Question 
						key={i}
						question={question}
						answeredChoiceNo={this.state.answers[question._id]} />
			})

		let score = this.state.questions.length - wrongQuestions.length
		let total = this.state.questions.length
		return (
			<div className="exam-result">
				<div className="container">
					<Summary score={score} total={total}/>
					<hr />
					{wrongQuestions}
				</div>
			</div>
		)
	}
})
