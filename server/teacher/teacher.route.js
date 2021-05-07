const express = require('express');
const router = express.Router();
const expressJWT = require('express-jwt');
const multer = require('multer');

const config = require('../../config/config');
const teacherController = require('./teacher.controller');
const upload = multer({ dest: './public/data/uploads/' });

router
  .route('/teachers')
  .get(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    teacherController.getTeachers
  ).post(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    teacherController.createTeacher
  ).put(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    teacherController.updateTeachers
  ).delete(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    teacherController.deleteTeachers
  );

router
  .route('/teacher/:id')
  .get(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    teacherController.getTeacherByID
  ).put(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    teacherController.updateTeacherByID
  ).delete(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    teacherController.deleteTeacherByID
  );

  router
  .route('/teachers/upload')
  .post(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    upload.single('file'),
    teacherController.teachersFileUpload
  )  

module.exports = router;
