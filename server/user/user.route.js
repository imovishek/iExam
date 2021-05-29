const express = require('express');
const router = express.Router();
const expressJWT = require('express-jwt');

const config = require('../../config/config');
const userController = require('./user.controller');

router
  .route('/users')
  .get(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    userController.getUsers
  ).post(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    userController.createUser
  ).put(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    userController.updateUsers
  ).delete(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    userController.deleteUsers
  );

router
  .route('/user/:id')
  .get(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    userController.getUserByID
  ).put(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    userController.updateUserByID
  ).delete(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    userController.deleteUserByID
  );

router
  .route('/user/resetPassword')
  .post(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    userController.resetPassword
  )

module.exports = router;
