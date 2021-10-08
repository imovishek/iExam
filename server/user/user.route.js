const express = require('express');
const { DEPTADMIN, TEACHER, STUDENT,SUPERADMIN } = require('../constants');
const router = express.Router();
const secureApiCall = require('../middlewares/secureApiCall');
const userController = require('./user.controller');

router
  .route('/user/me')
  .get(
    secureApiCall([DEPTADMIN, TEACHER, STUDENT,SUPERADMIN]),
    userController.getUserMe
  )
  .put(
    secureApiCall([DEPTADMIN, TEACHER, STUDENT,SUPERADMIN]),
    userController.updateUserMe
  )

router
  .route('/users')
  .get(
    secureApiCall([DEPTADMIN, STUDENT, TEACHER]),
    userController.getUsers
  ).post(
    secureApiCall([DEPTADMIN]),
    userController.createUser
  ).put(
    secureApiCall([DEPTADMIN]),
    userController.updateUsers
  ).delete(
    secureApiCall([]),
    userController.deleteUsers
  );

router
  .route('/user/:id')
  .get(
    secureApiCall([DEPTADMIN]),
    userController.getUserByID
  ).put(
    secureApiCall([DEPTADMIN]),
    userController.updateUserByID
  ).delete(
    secureApiCall([DEPTADMIN]),
    userController.deleteUserByID
  );

router
  .route('/user/resetPassword')
  .post(
    secureApiCall([DEPTADMIN,SUPERADMIN]),
    userController.resetPassword
  )

router
  .route('/user/forgotPassword')
  .post(
    userController.forgotPassword
  )

module.exports = router;
