const express = require('express');
const router = express.Router();
const expressJWT = require('express-jwt');

const config = require('../../config/config');
const courseController = require('./course.controller');

router
  .route('/courses')
  .get(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    courseController.getCourses
  ).post(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    courseController.createCourse
  ).put(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    courseController.updateCourses
  ).delete(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    courseController.deleteCourses
  );

router
  .route('/course/:id')
  .get(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    courseController.getCourseByID
  ).put(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    courseController.updateCourseByID
  ).delete(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    courseController.deleteCourseByID
  );


module.exports = router;
