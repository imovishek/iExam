const express = require('express');
const router = express.Router();
const expressJWT = require('express-jwt');

const config = require('../../config/config');
const teacherController = require('./teacher.controller');

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


module.exports = router;
