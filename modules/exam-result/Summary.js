import React from 'react';

export default React.createClass({
	render() {
		return (
			<div className="row summary">
				<div className="col-md-6 col-md-offset-3">					
					<h1>ผลสอบ {this.props.score} / {this.props.total} คะแนน</h1>
					<p>
						เช็คข้อผิดและเฉลยได้ด้านล่าง หากพบข้อสงสัยสามารถสอบถามได้ที่ 
						&nbsp;<a href="https://github.com/hibikiledo/DLEQ" target="_blank">Issue Tracker</a>
					</p>
				</div>
			</div>
		);
	}
});
