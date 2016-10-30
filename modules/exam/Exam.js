import React from 'react'
import $ from 'jquery'

import Configuration from '../Configuration'

import Question from './Question'
import SubmitButton from './SubmitButton'

export default React.createClass({
  apiBaseUrl: Configuration.apiBaseUrl,
  siteBaseUrl: Configuration.siteBaseUrl,
  answers: {
    /*  */
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState() {
    return {
      questionSet: []
    }
  },
  componentDidMount() {
    $.ajax({
      url: `${this.apiBaseUrl}/exams/${this.props.params.examId}`,
      success: (res) => {
        if (res.success) {
          this.setState({questionSet: res.data})
        }
        else {
          console.log(res.reason)
        }
      }
    })
  },
  _onQuestionAnswered(questionNo, choiceNo) {
    this.answers[questionNo] = choiceNo
  },
  _onExamSubmit() {
    console.log('submit')
    $.ajax({
      method: "POST",
      url: `${this.apiBaseUrl}/exams/${this.props.params.examId}/submit`,
      data: JSON.stringify({answers: this.answers}),
      contentType: "application/json",
      success: (res) => {
        if (res.success) {
          let path = `/exams/${this.props.params.examId}/results/${res.data.resultId}`
          this.context.router.push(path)
        }
        else {
          console.log(res.reason)
        }
      }
    })
  },
  render() {
    let questions = this.state.questionSet.map((question, i) => {
      return (
        <Question
              key={i}
              questionNo={i}
              question={question}
              onQuestionAnswered={this._onQuestionAnswered} />
      )
    })
    return (
      <div className="exam">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">					
            <h1>ข้อมูลชุดข้อสอบ</h1>
            <p>
              เลขที่ชุดข้อสอบ : {this.props.params.examId}<br />
              จำนวนข้อสอบ : {this.state.questionSet.length}
            </p>
          </div>
        </div>
        <div className="row"><hr /></div>
          {questions}       
        <div className="row"><hr /></div>
          <SubmitButton 
              text="ส่งข้อสอบ" 
              onClick={this._onExamSubmit} />
      </div>
    )
  }
})