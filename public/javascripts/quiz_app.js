var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');




var QuizApp = React.createClass({
  getInitialState: function() {
    return {
      scores: [],
      questions: [],
      examSubmitted: false,
      totalScore: 0
    };
  },

  componentDidMount: function() {
    $.ajax({
      url: `${this.props.baseUrl}/api/exam/${this.props.examId}`,
      success: (res) => {
        if (res.success) {
          let initialScores = [];
          for(let i=0; i<res.data.length; i++) {
            initialScores[i] = 0;
          }
          this.setState({questions: res.data, scores: initialScores});
        } else {
          window.location = this.props.baseUrl;
        }
      }
    });
  },

  handleAnswerSelected: function(result) {
    let newScores = this.state.scores;
    newScores[result.questionNo] = result.score;
    this.setState({scores: newScores})
  },

  handleQuizSumission: function() {
    let totalScore = this.state.scores.reduce((sum, current) => {
      return sum += current;
    }, 0);
    this.setState({examSubmitted: true, totalScore: totalScore});

    let data = this.state.questions.map((q, i) => {
      return {_id: q._id, correct: this.state.scores[i] === 1};
    });
    $.ajax({
      url: `${this.props.baseUrl}/api/exam/result`,
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function() {
        console.log('success');
      }
    });

    $("html, body").animate({ scrollTop: 0 }, "slow");
  },

  render: function() {
    let questions = this.state.questions.map((q, i) => {
      if (this.state.examSubmitted) {
        if (this.state.scores[i] == 0) {
          return (
            <Question
              key={i}
              questionNo={i}
              question={q}
              baseUrl={this.props.baseUrl}
              showAnswerKey={true}
              onAnswerSelected={this.handleAnswerSelected} />
          );
        }
      }
      else {
        return (
          <Question
            key={i}
            questionNo={i}
            question={q}
            baseUrl={this.props.baseUrl}
            showAnswerKey={false}
            onAnswerSelected={this.handleAnswerSelected} />
        );
      }
    });

    return (
      <div>

        <div className="jumbotron">
          <div className="container">
            <h2 className="text-center">{this.props.title}</h2>
            <p className="text-center">{this.props.subTitle}</p>
          </div>
        </div>

        <div id="exam-result" className={(this.state.examSubmitted ? 'show' : 'hidden') + ' container'}>
          <div className="row">
            <div className="col-md-offset-3 col-md-6">
              <h1>ผลสอบ {this.state.totalScore} / {this.state.questions.length} คะแนน</h1>
              <p>
                เช็คข้อผิดและเฉลยได้ด้านล่าง หากพบข้อสงสัยสามารถสอบถามได้ที่ <a href="https://github.com/hibikiledo/DLEQ/issues">Issue Tracker</a>                
              </p>
              <a href={this.props.baseUrl}>สร้างแบบทดสอบใหม่</a>              <a href={`${this.props.baseUrl}/exam/${this.props.examId}`}>ทำใหม่อีกครั้ง</a>
            </div>
          </div>    
        </div>

        <hr className={this.state.examSubmitted ? 'show' : 'hidden'} />

        <div className="container">
          <div className="row">
            <div className="col-md-offset-3 col-md-6">
              {questions}
            </div>
          </div>    
        </div>

        <hr className={this.state.examSubmitted ? 'hidden' : 'show'} />

        <div className={(this.state.examSubmitted ? 'hidden' : 'show') + ' container'}>
          <div className="row">
            <div className="col-md-offset-3 col-md-6">
              <div className="text-right">
                <button type="button" 
                  className="btn btn-success btn-lg bottom-15"
                  onClick={this.handleQuizSumission}>
                    ส่งข้อสอบ
                </button>
              </div>
            </div>
          </div>                
        </div>

        <div className={(this.state.examSubmitted ? 'show' : 'hidden') + ' container'}>
          <div className="row">
            <div className="col-md-offset-3 col-md-6">
              <div className="text-right end-of-page-margin">
                <a href="#exam-result">^กลับไปด้านบน</a>
              </div>
            </div>
          </div>                
        </div>        

      </div>
    );

  }
});




var Question = React.createClass({    
  getInitialState: function() {
    return {
      score: 0,
      choiceCheckStates: [false, false, false, false]      
    };
  },

  handleChoiceSelected: function(childProps) {

    if (this.props.showAnswerKey) {
      return;
    }

    let newChoiceCheckStates = [false, false, false, false];
    newChoiceCheckStates[ childProps.choiceNo ] = true;          

    this.setState({choiceCheckStates: newChoiceCheckStates});          

    if (childProps.choice.correct) {
      this.setState({score: 1});
      this.props.onAnswerSelected({questionNo: this.props.questionNo, score: 1});
    }
    else {
      this.setState({score: 0});
      this.props.onAnswerSelected({questionNo: this.props.questionNo, score: 0});
    }
  },  

  render: function() {
    let question = this.props.question;
    let choices = question.choices.map((c, i) => {
      return <Choice 
                key={i} 
                choiceNo={i} 
                choice={c} 
                selected={this.state.choiceCheckStates[i]}
                showAnswerKey={this.props.showAnswerKey}
                onChoiceSelected={this.handleChoiceSelected} />
    });

    let questionImages = null;
    if (question.images.length > 0) {
      questionImages = question.images.map((image, i) => {
        return <QuestionImage
                  key={i}
                  imageUrl={`${this.props.baseUrl}/images/${image}`} />
      });
    }

    return (
      <div className="question">
        <h3 className="question-text">
          {this.props.questionNo + 1}. {question.question}
        </h3>
        {questionImages}
        <ul className="list-group">
         {choices}
        </ul>
        <AnswerKey answer={question.answer} showAnswerKey={this.props.showAnswerKey} />
      </div>
    );

  }
});




var AnswerKey = React.createClass({
  getInitialState: function() {
    return {showAnswerKey: false};
  },
  toggleAnswerKey: function(e) {
    this.setState({showAnswerKey: !this.state.showAnswerKey});
  },
  render: function() {
    let showAnswerKey = this.props.showAnswerKey ? true : this.state.showAnswerKey;
    return(
      <div>
        <button type="button" className="btn btn-info" onClick={this.toggleAnswerKey}>
          {showAnswerKey ? 'ปิดเฉลย' :'เปิดเฉลย'}
        </button>

        <div className={(showAnswerKey ? 'show' : 'hidden') + ' well well-sm answer-key'}>
          เฉลย: {this.props.answer}
        </div>
      </div>
    );
  }
});



// QuestionImage
// Represent an image in a question
// imageUrl : imageUrl to be used as src in <img />
var QuestionImage = React.createClass({
  render: function() {
    return (
      <img 
        className="question-image"
        src={this.props.imageUrl} />
    );
  }
})




// Choice
// key : unique identifier for each choice in an array
// choiceNo : unique identifier for each choice in an array
// selected : indicate if this choice is selected or not
// mode : if exam hilight color is blue. if result hilight color is red
// onChoiceSelected : callback function when choice text or radio button is clicked
//   callback signature - function(props) {} - where props are this.props of choice
var Choice = React.createClass({
  handleClick: function() {
    this.props.onChoiceSelected(this.props);
  },
  render: function() {

    let cssClasses = [
      'list-group-item',
      'choice'
    ];

    if (this.props.selected) {
      cssClasses.push('active');
    }
    if (this.props.showAnswerKey && this.props.choice.correct) {
      cssClasses.push('active');
      cssClasses.push('correct-choice');
    }

    return (
      <h4>
        <li className={cssClasses.join(' ')} onClick={this.handleClick}>
          {this.props.choice.text}
        </li>
      </h4>
    );
  }
});




ReactDOM.render(
  <QuizApp baseUrl={baseUrl} examId={examId} title={title} subTitle={subTitle} />,
  document.getElementById('quiz-app')
);