const express = require('express');
const router = express.Router();
const expressJWT = require('express-jwt');
const multer = require('multer');

const config = require('../../config/config');
const studentController = require('./student.controller');
const upload = multer({ dest: './public/data/uploads/' });

router
  .route('/students')
  .get(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    studentController.getStudents
  ).post(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    studentController.createStudent
  ).put(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    studentController.updateStudents
  ).delete(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    studentController.deleteStudents
  );

router
  .route('/student/:id')
  .get(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    studentController.getStudentByID
  ).put(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    studentController.updateStudentByID
  ).delete(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    studentController.deleteStudentByID
  );

router
  .route('/students/batch')
  .get(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    studentController.getStudentsByBatch
  );
  router
  .route('/students/upload')
  .post(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    upload.single('file'),
    studentController.studentsFileUpload
  )

module.exports = router;
