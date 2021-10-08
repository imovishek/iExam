const express = require('express');
const router = express.Router();
const multer = require('multer');
const { DEPTADMIN, TEACHER } = require('../constants');
const secureApiCall = require('../middlewares/secureApiCall');
const teacherController = require('./teacher.controller');
const upload = multer({ dest: './public/data/uploads/' });

router
  .route('/teachers')
  .get(
    secureApiCall([DEPTADMIN, TEACHER]),
    teacherController.getTeachers
  ).post(
    secureApiCall([DEPTADMIN]),
    teacherController.createTeacher
  ).put(
    secureApiCall([DEPTADMIN]),
    teacherController.updateTeachers
  ).delete(
    secureApiCall([DEPTADMIN]),
    teacherController.deleteTeachers
  );

router
  .route('/teacher/:id')
  .get(
    secureApiCall([DEPTADMIN]),
    teacherController.getTeacherByID
  ).put(
    secureApiCall([DEPTADMIN]),
    teacherController.updateTeacherByID
  ).delete(
    secureApiCall([DEPTADMIN]),
    teacherController.deleteTeacherByID
  );

  router
  .route('/teachers/upload')
  .post(
    secureApiCall([DEPTADMIN]),
    upload.single('file'),
    teacherController.teachersFileUpload
  )  

module.exports = router;
