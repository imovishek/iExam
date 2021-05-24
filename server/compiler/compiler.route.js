const express = require('express');
const router = express.Router();
const expressJWT = require('express-jwt');

const config = require('../../config/config');
const compilerController = require('./compiler.controller');

router
  .route('/compiler/simpleRun')
  .post(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    compilerController.simpleRun
  )

router
  .route('/compiler/runEvaluation')
  .post(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    compilerController.runEvaluation
  )

module.exports = router;
