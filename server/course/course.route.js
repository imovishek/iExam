const express = require('express');
const router = express.Router();
const multer = require('multer');

const { TEACHER, STUDENT, DEPTADMIN } = require('../constants');
const secureApiCall = require('../middlewares/secureApiCall');
const courseController = require('./course.controller');
const upload = multer({ dest: './public/data/uploads/' });

router
  .route('/courses')
  .get(courseController.getCourses)
  .post(secureApiCall([TEACHER, DEPTADMIN]), courseController.createCourse)
  .put(secureApiCall([]), courseController.updateCourses)
  .delete(secureApiCall([]), courseController.deleteCourses);

router
  .route('/course/:id')
  .get(courseController.getCourseByID)
  .put(secureApiCall([TEACHER, DEPTADMIN]), courseController.updateCourseByID)
  .delete(secureApiCall([DEPTADMIN]), courseController.deleteCourseByID);
router
  .route('/courses/upload')
  .post(
    upload.single('file'),
    secureApiCall([DEPTADMIN]),
    courseController.coursesFileUpload
  )
router
  .route('/enrollrequest/:courseID')
  .put(secureApiCall([STUDENT]), courseController.enrollMeRequest)
module.exports = router;
