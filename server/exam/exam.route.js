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

router
  .route('/exam/:id/paper')
  .get(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    examController.getExamByIDWithUserPaper
  )
  .put(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    examController.updateExamPaperForStudent
  )

router
  .route('/exam/:id/evaluatepaper')
  .put(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    examController.updateExamPaperForTeacher
  )

router
  .route('/exam/:id/filter')
  .post(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    examController.getExamUsingFilterByID
  )


module.exports = router;
