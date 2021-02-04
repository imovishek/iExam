const express = require('express');
const router = express.Router();
const expressJWT = require('express-jwt');

const config = require('../../config/config');
const questionController = require('./question.controller');

router
  .route('/questions')
  .get(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    questionController.getQuestions
  ).post(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    questionController.createQuestion
  ).put(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    questionController.updateQuestions
  ).delete(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    questionController.deleteQuestions
  );

router
  .route('/question/:id')
  .get(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    questionController.getQuestionByID
  ).put(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    questionController.updateQuestionByID
  ).delete(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    questionController.deleteQuestionByID
  );


module.exports = router;
