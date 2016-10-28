import React from 'react'
import Configuration from './Configuration'

export default React.createClass({
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" 
                    className="navbar-toggle collapsed"
                    data-toggle="collapse"
                    data-target="#navbar-collapse-target"
                    aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href={`${Configuration.siteBaseUrl}`}>D L E Q</a>
          </div>            
          <div className="collapse navbar-collapse" id="navbar-collapse-target">
            {/* Navbar Left */}
            <ul className="nav navbar-nav navbar-left">
              <li className="active">
                <a href={`${Configuration.siteBaseUrl}/exams/new`}>สร้างชุดข้อสอบ</a>
                </li>
              <li><a href="#">ทดลองทำข้อสอบ</a></li>
              <li><a href="#">สถิติ</a></li>
              <li><a href="#">บริจาค</a></li>                
            </ul>
            {/* Navbar Right */}
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#">Find us on <strong>Github</strong></a></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
})