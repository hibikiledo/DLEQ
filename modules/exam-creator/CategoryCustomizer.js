import React, { Component } from 'react'

class CategoryCustomizer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      preferQuestionCount: 0
    }

    this._onBlur = this._onBlur.bind(this)
    this._onChange = this._onChange.bind(this)
    this._onMinusFive = this._onMinusFive.bind(this)
    this._onPlusFive = this._onPlusFive.bind(this)
    this._onMinusOne = this._onMinusOne.bind(this)
    this._onPlusOne = this._onPlusOne.bind(this)
  }  
  _setState(states) {    
    let preferences = {
      preferQuestionCount: states.preferQuestionCount
    }
    this.props.onPreferenceChange(this.props.category.name, preferences)
    this.setState(states)
  }
  _onBlur() {
    console.log("blur")
    if (isNaN(this.state.preferQuestionCount)) {
      this._setState({preferQuestionCount: 0});
    }
    else {
      this._setState({
        preferQuestionCount: Math.max(0, Math.min(this.props.category.count, this.state.preferQuestionCount))
      })
    }
    this.props.onPreferenceChange(this.state)
  }
  _onChange(event) {
    let value = event.target.value
    this._setState({preferQuestionCount: value})
  }
  _onMinusFive() {
    if (this.state.preferQuestionCount - 5 < 0) {
      this._setState({preferQuestionCount: 0})
      return
    }
    this._setState({preferQuestionCount: this.state.preferQuestionCount - 5})
  }
  _onPlusFive() {
    if (this.state.preferQuestionCount + 5 > this.props.category.count) {
      this._setState({preferQuestionCount: this.props.category.count})
      return
    }
    this._setState({preferQuestionCount: this.state.preferQuestionCount + 5})
  }
  _onMinusOne() {
    if (this.state.preferQuestionCount - 1 < 0) {
      this._setState({preferQuestionCount: 0})
      return
    }
    this._setState({preferQuestionCount: this.state.preferQuestionCount - 1})
  }
  _onPlusOne() {
    if (this.state.preferQuestionCount + 1 > this.props.category.count) {
      this._setState({preferQuestionCount: this.props.category.count})
      return
    }
    this._setState({preferQuestionCount: this.state.preferQuestionCount + 1})
  }
  render() {
      return (
        <div className="row category-customizer">
          <div className="col-md-6 col-md-offset-3">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">{this.props.category.name}</h3>
              </div>
              <div className="panel-body">
                <h4>จำนวนข้อสอบ</h4>
                <div className="input-group input-group-lg">
                  <div className="input-group-btn">
                    <button type="button" className="btn btn-default" onClick={this._onMinusFive}>-5</button>
                    <button type="button" className="btn btn-default" onClick={this._onMinusOne}>-1</button>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    value={this.state.preferQuestionCount}
                    onChange={this._onChange}
                    onBlur={this._onBlur} />
                  <div className="input-group-btn">
                    <button type="button" className="btn btn-default" onClick={this._onPlusOne}>+1</button>
                    <button type="button" className="btn btn-default" onClick={this._onPlusFive}>+5</button>
                  </div>
                </div>
                <h5>คุณเลือก {this.state.preferQuestionCount} ข้อจากทั้งหมด {this.props.category.count}</h5>
              </div>
            </div>
          </div>
        </div>
      )
  }
}

export default CategoryCustomizer
