import React from 'react'

import QuestionText from './QuestionText'
import ChoiceGroup from './ChoiceGroup'
import ImageList from './ImageList'
import AnswerKey from './AnswerKey'

export default React.createClass({
  _onChoiceSelected(choiceNo) {
    this.props.onQuestionAnswered(this.props.question._id, choiceNo)
  },
  render() {
    return (
      <div className="row question">
        <div className="col-md-6 col-md-offset-3">
          <QuestionText text={this.props.question.question} />
          <ImageList images={this.props.question.images} />
          <ChoiceGroup 
                  choices={this.props.question.choices}
                  onChoiceSelected={this._onChoiceSelected} />
          <AnswerKey text={this.props.question.answer} />         
        </div>
      </div>
    )
  }
})