import React, { Component } from 'react'
import update from 'react-addons-update'
import classNames from 'classNames'
import $ from 'jquery'

import CategorySelector from './CategorySelector'
import CategoryCustomizer from './CategoryCustomizer'

import Configuration from '../Configuration'

class ExamCreator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCategoryNames: [],
      categories: []
    }   

    // data store for user preferences for the exam
    this.preferences = {}

    this.apiBaseUrl = Configuration.apiBaseUrl;

    // bindings    
    this._onPreferenceChange = this._onPreferenceChange.bind(this)
    this._onCreateExamButtonClick = this._onCreateExamButtonClick.bind(this)
    this._onCategorySelected = this._onCategorySelected.bind(this)

  }  
  componentDidMount() {
    $.ajax({
      url: `${this.apiBaseUrl}/questions/categories`,
      success: (res) => {
        if (res.success) {
          this.setState({categories: res.data})
        }
        else {
          console.log(res.reason)
        }
      }
    })
  }
  _onPreferenceChange(categoryName, preferences) {
    this.preferences[categoryName] = preferences
  }
  _onCreateExamButtonClick(event) {
    console.log(this.preferences)
    $.ajax({
      url: `${this.apiBaseUrl}/exams/create`,
      method: "POST",
      data: JSON.stringify({preferences: this.preferences}),
      contentType: "application/json",
      success: (res) => {
        if (res.success) {
          let path = `/exams/${res.data.examId}`
          this.context.router.push(path)
        }
        else {
          console.log(res.reason)
        }
      }
    })
  }
  _onCategorySelected(selectedCategoryNames) {
    this.setState({selectedCategoryNames: selectedCategoryNames})
    console.log(selectedCategoryNames)
  }
  render() {
    let categoryCustomizers = this.state.categories.filter((category) => {
      return this.state.selectedCategoryNames.includes(category.name)
    })
    .map((category, i) => {
      return <CategoryCustomizer
                key={i}
                category={category}
                onPreferenceChange={this._onPreferenceChange} />
    })
    return (
      <div className="exam-creator">
        <CategorySelector 
          categories={this.state.categories}
          onCategorySelected={this._onCategorySelected} />
        { /* hide customizer and submit button when no category is selected */ }
        <div className={classNames({hidden: this.state.selectedCategoryNames.length == 0})}>
          <hr />
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <h2>ปรับแต่งจำนวนคำถาม</h2>
              <p>
                คุณสามารถระบุได้ว่า ในแบบทดสอบจะมีคำถามจากแต่ละหมวดหมู่จำนวนกี่คำถาม<br />
                กดปุ่ม - หรือ + เพื่อเพิ่มหรือลดจำนวนคำถามของแต่ละหมวดหมู่
              </p>
            </div>
          </div>
          {categoryCustomizers}
          <div className="create-exam-button">
            <hr />
            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                <div className="text-right">
                  <button type="button" className="btn btn-lg btn-success" onClick={this._onCreateExamButtonClick}>
                    สร้างแบบทดสอบ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ExamCreator.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default ExamCreator
