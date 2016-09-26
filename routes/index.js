var express = require('express');
var router = express.Router();

const host = 'http://127.0.0.1:3000';

/* Quiz maker page */
router.get('/', function(req, res, next) {
	res.render(
		'index',
		{
			title: 'ข้อสอบใบขับขี่',
			subTitle: '',
			baseUrl: host 
		}
	);
});

/* Quiz app */
router.get('/exam/:id', function(req, res, next) {
	res.render(
		'exam', 
		{ 
			baseUrl: host,
			examId: req.params.id,
			title: 'ข้อสอบใบขับขี่',
			subTitle: req.params.id
		}
	);
});

module.exports = router;
