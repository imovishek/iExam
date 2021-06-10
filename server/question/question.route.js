const express = require('express');
const { TEACHER } = require('../constants');
const router = express.Router();
const secureApiCall = require('../middlewares/secureApiCall');
const questionController = require('./question.controller');

router
  .route('/questions')
  .get(
    secureApiCall([TEACHER]),
    questionController.getQuestions
  ).post(
    secureApiCall([TEACHER]),
    questionController.createQuestion
  ).put(
    secureApiCall([TEACHER]),
    questionController.updateQuestions
  ).delete(
    secureApiCall([TEACHER]),
    questionController.deleteQuestions
  );

router
  .route('/question/:id')
  .get(
    secureApiCall([TEACHER]),
    questionController.getQuestionByID
  ).put(
    secureApiCall([TEACHER]),
    questionController.updateQuestionByID
  ).delete(
    secureApiCall([TEACHER]),
    questionController.deleteQuestionByID
  );


module.exports = router;
