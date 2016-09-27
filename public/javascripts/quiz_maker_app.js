var $ = require("jquery");
var React = require('react');
var ReactDOM = require('react-dom');
var ReactBootstrapSlider = require('react-bootstrap-slider').default;




var QuizMakerApp = React.createClass({
  
  getInitialState: function() {
    return {
      categories: [],
      selectedStates: {},
      categorySettings: {}
    }
  },

  componentDidMount: function() {
    $.ajax({
      url: `${this.props.baseUrl}/api/questions/categories`,
      method: "GET",
      success: (data) => {
        this.setState({categories: data});

        let initialSelectedStates = {};
        let initialCategorySettings = {};
        data.forEach((c)=> {
          initialSelectedStates[ c.name ] = false;
          initialCategorySettings[ c.name ] = {preferQuestionCount: 0};
        });
        this.setState({
          selectedStates: initialSelectedStates,
          categorySettings: initialCategorySettings
        });
      }
    });
  },

  handleCategoryButtonClicked: function(childProps) {
    let newSelectedStates = this.state.selectedStates;
    let newCategorySettings = this.state.categorySettings;
    newSelectedStates[ childProps.category.name ] = !this.state.selectedStates[ childProps.category.name ];
    newCategorySettings[ childProps.category.name ].preferQuestionCount = 0;

    this.setState({selectedStates: newSelectedStates, categorySettings: newCategorySettings});
  },

  handleCategorySettingChanged: function(childProps, settings) {
    let newCategorySettings = this.state.categorySettings;
    newCategorySettings[ childProps.category.name ] = settings;
    
    this.setState({categorySettings: newCategorySettings});
  },

  handleOnSubmitButtonClicked: function() {
    $.ajax({
      url: `${this.props.baseUrl}/api/exam/new`,
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(this.state.categorySettings),
      success: (data) => {
        if (data.success) {
          window.location.replace(`${this.props.baseUrl}/exam/${data.examId}`);
        }
      }
    });
  },

  render: function() {
    let categoryButtons = this.state.categories.map((c, i) => {
      return (
        <CategoryButton
            key={c.name}
            category={c} 
            selected={this.state.selectedStates[ c.name ]}
            onCategoryButtonClicked={this.handleCategoryButtonClicked} />
      );
    });

    let CategoryCustomizers = this.state.categories.map((c, i) => {
      if (this.state.selectedStates[ c.name ]) {
        return (
          <CategoryCustomizer 
            key={c.name}
            category={c}
            onCategorySettingChanged={this.handleCategorySettingChanged} />
        );
      }
    });

    let selectedCategoryCount = this.state.categories.reduce((prev, current) => {
      return this.state.selectedStates[ current.name ] ? prev+1 : prev;
    }, 0);

    let totalQuestionCount = 0;
    for ( category in this.state.categorySettings ) {
      totalQuestionCount += this.state.categorySettings[ category ].preferQuestionCount
    }

    return (
      <div className={this.state.categories.length > 0 ? 'show' : 'hidden'} >

            <div className="jumbotron">
              <div className="container">
                <h2 className="text-center">{this.props.title}</h2>
                <p className="text-center">{this.props.subTitle}</p>
                <div className="text-center">
                  <span className="find-us-on-github">FIND US ON</span>
                  <a href="https://github.com/hibikiledo/DLEQ">
                    <img src={`${this.props.baseUrl}/images/github-logo.png`} className="github-logo" />
                  </a>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="row">
                <div className="col-md-offset-2 col-md-8">
                  <h2>เลือกหมวดหมู่ของคำถาม</h2>
                  <p>
                    คลิกที่ปุ่มของแต่ละหมวดหมู่ เพื่อเพิ่มคำถามจากหมวดหมู่นั้นเข้าสู่แบบทดสอบ
                  </p>
                  {categoryButtons}
                </div>
              </div>    
            </div>

            <hr />

            <div className={(selectedCategoryCount > 0 ? 'show' : 'hidden') + ' container'}>
              <div className="row">
                <div className="col-md-offset-2 col-md-8">
                  <h2>ปรับแต่งจำนวนคำถาม</h2>
                  <p>
                    เลื่อนสไลเดอร์เพื่อปรับจำนวนคำถามของแต่ละหมวดหมู่
                  </p>
                  {CategoryCustomizers}
                  <QuestionCounter count={totalQuestionCount} />
                </div>
              </div>                
            </div>

            <hr className={(selectedCategoryCount > 0 ? 'show' : 'hidden')} />

            <div className={(selectedCategoryCount > 0 ? 'show' : 'hidden') + ' container'}>
          <div className="row">
            <div className="col-md-offset-2 col-md-8">
              <div className="text-right">
                <button 
                  type="button" 
                  className="btn btn-success btn-lg bottom-15"
                  onClick={this.handleOnSubmitButtonClicked}
                  disabled={totalQuestionCount == 0 ? 'disable' : ''}>
                    เริ่มทำข้อสอบ
                  </button>
              </div>
            </div>
          </div>                
        </div>

          </div>
        );
  }
});

var CategoryButton = React.createClass({
  handleButtonClicked: function() {
    this.props.onCategoryButtonClicked(this.props);
  },

  render: function() {
    return (
      <button 
        type="input" 
        className={(this.props.selected ? 'active' : '') + ' btn btn-default btn-lg category-button'}
        onClick={this.handleButtonClicked}>
          {this.props.category.name}
      </button>
    );
  }
});

var QuestionCounter = React.createClass({
  render: function() {
    return (
      <h4>จำนวนคำถามทั้งหมด {this.props.count} ข้อ</h4>
    );
  }
});

var CategoryCustomizer = React.createClass({
  getInitialState: function() {
    return {
      preferQuestionCount: 0      
    };
  },

  handleValueChanged: function(e) {
    this.setState({preferQuestionCount: e.target.value});
    /* schema for settings of each category */
    let settings = {
      preferQuestionCount: e.target.value
    };
    this.props.onCategorySettingChanged(this.props, settings);
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="panel panel-primary">
            <div className="panel-heading">
              {this.props.category.name}
            </div>
            <div className="panel-body">
              <h5>จำนวนคำถาม {this.state.preferQuestionCount} / {this.props.category.questionCount}</h5>
              <ReactBootstrapSlider
                  value={this.state.preferQuestionCount}
                  handleChange={this.handleValueChanged}
                  step="1"
                  max={this.props.category.questionCount}
                  min="0"
                  reverse={true} />
            </div>
          </div>

          <h4></h4>           
        </div>
      </div>        
    );
  }
});

ReactDOM.render(
  <QuizMakerApp baseUrl={baseUrl} title={title} subTitle={subTitle} />,
  document.getElementById('quiz-maker-app')
);