const express = require('express');
const router = express.Router();
const expressJWT = require('express-jwt');

const config = require('../../config/config');
const examController = require('./exam.controller');

router
  .route('/exams')
  .get(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    examController.getExams
  ).post(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    examController.createExam
  ).put(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    examController.updateExams
  ).delete(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    examController.deleteExams
  );

router
  .route('/exam/:id')
  .get(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    examController.getExamByID
  ).put(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    examController.updateExamByID
  ).delete(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    examController.deleteExamByID
  );


module.exports = router;
