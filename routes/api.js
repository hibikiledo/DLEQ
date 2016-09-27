var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var assert = require('assert');

var CryptoJS = require("crypto-js");
var uuid = require('node-uuid');

const url = 'mongodb://localhost:27017/dleq';

/* Create new quiz collection */
router.post('/exam/new', function(req, res, next) {

	let examSettings = req.body;

	// TODO : Fix here Date() gives duplicate hash	
	var id = uuid.v4();
	console.log(id);
	
	let getExamQuestionsPromises = [];
	for ( let category in examSettings ) {
		getExamQuestionsPromises.push(
			new Promise((resolve, reject) => {
				MongoClient.connect(url, (err, db) => {
					assert.equal(null, err);
					db
						.collection('questions')						
						.aggregate(
							[
								{ $match: { category: category } },
								{ $sample: { size: examSettings[category].preferQuestionCount } }								
							]
						)
						.toArray((err, result)=> {
							assert.equal(null, err);
							resolve(result)
							db.close();
						}
					);
				});
			})
		);
	}
	Promise.all(getExamQuestionsPromises)
		.then((results) => {		
			// marge questions from different category to one big array
			let allQuestions = results.reduce((prev, curr) => {
				prev.push(...curr);
				return prev;
			}, []);
			console.log(allQuestions);

			MongoClient.connect(url, (err,db) => {
				assert.equal(null, err);
				db.createCollection(id, {}, (err, collection) => {
					collection.insertMany(allQuestions, {}, (err, result) => {
						assert(allQuestions.length, result.insertedCount);
						res.json({success: true, examId: id});
					});
				})
			});
		})
		.catch((reason) => {
			res.json({success: false, reason: reason});
		});
});

/* Return quiz questions according to quiz id */
router.get('/exam/:id', function(req, res, next) {
	let examId = req.params.id;
	console.log(examId);

	MongoClient.connect(url, (err, db) => {
		assert.equal(null, err);
		db
			.collection(examId)
			.find({}, {tries: 0, success: 0, failure: 0})
			.toArray((err, result) => {
				assert.equal(null, err);
				if (result.length == 0) {
					res.json({success: false, reason: `Exam with ${examId} is not valid.`});
				} else {
					res.json({success: true, data: result});
				}
				
			});
	});	
});

router.get('/questions/categories', function(req, res, next) {

	new Promise((resolve, reject) => {

		MongoClient.connect(url, (err, db) => {
			assert.equal(null, err);

			let collection = db.collection('questions');

			collection.distinct('category', (err, result) => {
				assert.equal(null, err);
				resolve(result);

				db.close();
			});
		});
	}).then((categories)=> {

		let countQuestionsInEachCategoryPromises = categories.map((category) => {
			return new Promise((resolve, reject) => {
				MongoClient.connect(url, (err, db) => {
					assert.equal(null, err);

					let collection = db.collection('questions');

					collection.count({'category': category}, (err, result) => {
						assert.equal(null, err);
						resolve({name: category, questionCount: result});

						db.close();
					});
				});
			});
		});

		Promise.all(countQuestionsInEachCategoryPromises).then((results) => {
			res.json(results);
		});
	});

});

router.post('/exam/result', function(req, res, next) {

	let results = req.body;

	results.forEach((result) => {

		MongoClient.connect(url, (err, db) => {
			assert.equal(null, err);

			db.collection('questions').update(
				{_id: ObjectId(result._id)},
				{
					$inc: {
						tries: 1,
						success: result.correct ? 1 : 0,
						failure: ! result.correct ? 1 : 0
					}
				}
			);

			db.close()
		});
	});

	res.json({});
});

module.exports = router;
