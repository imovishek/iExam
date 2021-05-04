const express = require('express');
const router = express.Router();
const expressJWT = require('express-jwt');

const config = require('../../config/config');
const clarificationController = require('./clarification.controller');

router
  .route('/clarifications')
  .get(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    clarificationController.getClarifications
  ).post(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    clarificationController.createClarification
  ).put(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    clarificationController.updateClarifications
  ).delete(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    clarificationController.deleteClarifications
  );

router
  .route('/clarification/:id')
  .get(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    clarificationController.getClarificationByID
  ).put(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    clarificationController.updateClarificationByID
  ).delete(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    clarificationController.deleteClarificationByID
  );

router
  .route('/clarification/:id/clarification')
  .get(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    clarificationController.getClarificationByIDWithUserClarification
  )


module.exports = router;
