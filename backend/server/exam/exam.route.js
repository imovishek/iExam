const express = require('express');
const { TEACHER, STUDENT } = require('../constants');
const router = express.Router();
const secureApiCall = require('../middlewares/secureApiCall');
const examController = require('./exam.controller');

router
  .route('/exams')
  .get(
    secureApiCall([TEACHER, STUDENT]),
    examController.getExams
  ).post(
    secureApiCall([TEACHER]),
    examController.createExam
  ).put(
    secureApiCall([TEACHER]),
    examController.updateExams
  ).delete(
    secureApiCall([TEACHER]),
    examController.deleteExams
  );

router
  .route('/exam/:id')
  .get(
    secureApiCall([TEACHER, STUDENT]),
    examController.getExamByID
  ).put(
    secureApiCall([TEACHER]),
    examController.updateExamByID
  ).delete(
    secureApiCall([TEACHER]),
    examController.deleteExamByID
  );

router
  .route('/exam/:id/paper')
  .get(
    secureApiCall([TEACHER, STUDENT]),
    examController.getExamByIDWithUserPaper
  )
  .put(
    secureApiCall([TEACHER, STUDENT]),
    examController.updateExamPaperForStudent
  )

router
  .route('/exam/:id/evaluatepaper')
  .put(
    secureApiCall([TEACHER]),
    examController.updateExamPaperForTeacher
  )

router
  .route('/exam/:id/filter')
  .post(
    secureApiCall([TEACHER]),
    examController.getExamUsingFilterByID
  )


module.exports = router;
