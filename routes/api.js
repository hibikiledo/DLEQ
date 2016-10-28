var express = require('express')
var router = express.Router()

var MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectId
var assert = require('assert')

var CryptoJS = require("crypto-js")
var uuid = require('node-uuid')

const mongodbUrl = 'mongodb://localhost:27017/dleq'

/* Return list of questions for this examId */
router.get('/exams/:examId', function(req, res) {

  if (ObjectId.isValid(req.params.examId)) {
    MongoClient.connect(mongodbUrl, function(err, db) {
      assert.equal(null, err)
      db.collection('exams')
        // find questionSet with documentId equals examId
        .findOne({_id: ObjectId(req.params.examId)})
        // find questions from questionIds in questionSet
        .then((exam) => {
          return db.collection('questions')
                    .find({
                      _id: {$in: exam.questions.map((id)=>{return ObjectId(id)})}
                    })
                    .toArray()
        })
        // send questions back as requested
        .then((questions) => {
          res.json({success: true, data: questions})
          db.close()
        })
        // catch naugthy error
        .catch((reason) => {
          res.json({success: false, reason: reason})
          db.close()
        })
    })
  }
  else {
    res.json({success: false, reason: 'exam_id is invalid'})
  }

})

router.get('/exams/:examId/results/:resultId', function(req, res) {

  if (ObjectId.isValid(req.params.examId) && ObjectId.isValid(req.params.resultId)) {
    MongoClient.connect(mongodbUrl, function(err, db) {
      assert.equal(null, err)

      let response = {}

      db.collection('submissions')
        .findOne({examId: req.params.examId, _id: ObjectId(req.params.resultId)})
        .then((submission) => {
          console.log(submission)
          response.answers = submission.answers
          return db.collection('exams')
                .findOne({_id: ObjectId(submission.examId)})
        })
        .then((exam) => {
          console.log(exam)
          return db.collection('questions')
                .find({
                  _id: {$in: exam.questions.map((id)=>{return ObjectId(id)})}
                })
                .toArray()
        })
        .then((questions) => {
          response.questions = questions
          res.json({success: true, data: response})
          db.close()
        })
        .catch((reason) => {
          res.json({success: false, reason: reason})
          db.close()
        })
    })
  }
  else {
    res.json({success: false, reason: 'examId or resultId is invalid'})
  }

})

/* Save exam result */
router.post('/exams/:examId/submit', function(req, res) {

  if (ObjectId.isValid(req.params.examId)) {

    // Todo : Validate data from client
    let answers = req.body.answers;

    MongoClient.connect(mongodbUrl, function(err, db) {
      assert.equal(null, err)
      db.collection('submissions')
        // insert exam result
        .insert(
          {
            examId: req.params.examId,
            answers: answers
          }
        )
        .then((examResult) => {
          assert.ok(examResult.insertedCount === 1)
          res.json({success: true, data: {resultId: examResult.insertedIds[1]}})
          db.close()
        })
        .catch((reason) => {
          res.json({success: false, reason: reason})
          db.close()
        })
    })
  }
  else {
    res.json({success: false, reason: 'exam_id is invalid'})
  }
})

/* return all question categories */
router.get('/questions/categories', function(req, res) {
  MongoClient.connect(mongodbUrl, function(err, db) {
    assert.equal(null, err)
    db.collection('questions')
      .aggregate([
        {
          $group: {
            _id: "$category",
            count: {$sum: 1}
          }
        }
      ], function(err, result) {
        assert.equal(null, err);
        let data = result.map((category) => {
          return {name: category._id, count: category.count}
        })
        res.json({success: true, data: data})
        console.log(result);
        db.close()
      })
  })
})

/* create new exams */
router.post('/exams/create', function(req, res) {
  // Todo : Validate user request
  let questionPreferences = req.body.preferences
  
  let totalQuestionCount = Object.keys(questionPreferences).reduce((prev, current) => {
    return prev + questionPreferences[current].preferQuestionCount
  }, 0)
  
  if (totalQuestionCount === 0) {
    res.json({success: false, reason: "An exam should have at least 1 question."})
    return;
  }
  
  let getSampleQuestionsPromises = Object.keys(questionPreferences).map((categoryName) => {
    let pref = questionPreferences[categoryName]
    return getSampleQuestions(categoryName, pref.preferQuestionCount)
  })

  MongoClient.connect(mongodbUrl, function(err, db) {
    assert.equal(null, err)
    Promise.all(getSampleQuestionsPromises)
      .then((questionsFromEachCategory) => {
        // result from Promise.all gives us double array 
        // [ [result of promise 1] , [result of promise 2]]
        // here we just combine them into 1-d array
        let combinedQuestions = []
        questionsFromEachCategory.forEach((questions) => {
          combinedQuestions.push(...questions)
        })
        let questionIds = combinedQuestions.map((question) => {return question._id})      
        return db.collection('exams').insert({
            questions: questionIds
          })
      })
      .then((result) => {
        assert.ok(result.insertedCount === 1)
        res.json({success: true, data: {examId: result.insertedIds[1]}})
        db.close()
      })
      .catch((reason) => {
        console.log(reason)
        res.json({success: false, reason: reason})
        db.close()
      })
  })  
})

/**
 * Return a promise which samples questions from the `questions` collection
 */
function getSampleQuestions(categoryName, numQuestion) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(mongodbUrl, function(err, db) {
      if (err) reject(err)
      db.collection('questions')
        .aggregate([
          {$match: {category: categoryName}},
          {$sample: {size: numQuestion}}
        ], function(err, result) {
          console.log(result)
          if (err) {
            reject(err)
          }
          resolve(result)
          db.close()
        })
    })    
  })
}

module.exports = router
