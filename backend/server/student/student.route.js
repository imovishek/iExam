const express = require('express');
const router = express.Router();
const multer = require('multer');
const { DEPTADMIN, TEACHER } = require('../constants');
const secureApiCall = require('../middlewares/secureApiCall');
const studentController = require('./student.controller');
const upload = multer({ dest: './public/data/uploads/' });

router
  .route('/students')
  .get(
    secureApiCall([DEPTADMIN, TEACHER]),
    studentController.getStudents
  ).post(
    secureApiCall([DEPTADMIN]),
    studentController.createStudent
  ).put(
    secureApiCall([DEPTADMIN]),
    studentController.updateStudents
  ).delete(
    secureApiCall([DEPTADMIN]),
    studentController.deleteStudents
  );

router
  .route('/student/:id')
  .get(
    secureApiCall([DEPTADMIN]),
    studentController.getStudentByID
  ).put(
    secureApiCall([DEPTADMIN]),
    studentController.updateStudentByID
  ).delete(
    secureApiCall([DEPTADMIN]),
    studentController.deleteStudentByID
  );

router
  .route('/students/batch')
  .get(
    secureApiCall([DEPTADMIN, TEACHER]),
    studentController.getStudentsByBatch
  );
  router
  .route('/students/upload')
  .post(
    secureApiCall([DEPTADMIN]),
    upload.single('file'),
    studentController.studentsFileUpload
  )

module.exports = router;
