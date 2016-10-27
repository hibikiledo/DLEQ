import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, Link, IndexRoute } from 'react-router'

import App from './modules/App'
import Exam from './modules/exam/Exam'
import ExamResult from './modules/exam-result/ExamResult'
import ExamCreator from './modules/exam-creator/ExamCreator'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/exams">
        <Route path="/exams/new" component={ExamCreator}/>
        <Route path="/exams/:examId" component={Exam} />
        <Route path="/exams/:examId/results/:resultId" component={ExamResult} />
      </Route>
    </Route>
  </Router>
), document.getElementById('app'))