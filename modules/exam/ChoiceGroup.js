import React from 'react'
import Choice from './Choice'

export default React.createClass({
  getInitialState() {
    return {
      selectedChoiceNo: -1
    }
  },
  _onChoiceClick(selectedChoiceNo) {
    this.setState({
      selectedChoiceNo: selectedChoiceNo
    })
    this.props.onChoiceSelected(selectedChoiceNo)
  },
  render() {
    let choices = this.props.choices.map((choice, i) => {
        return <Choice 
                  key={i}
                  choiceNo={i}
                  choice={choice}
                  selected={this.state.selectedChoiceNo === i}
                  onChoiceClick={this._onChoiceClick} />
    })
    return (
      <div className="list-group">
        {choices}
      </div>
    )
  }
})