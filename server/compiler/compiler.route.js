const express = require('express');
const { TEACHER, STUDENT } = require('../constants');
const router = express.Router();
const secureApiCall = require('../middlewares/secureApiCall');


const compilerController = require('./compiler.controller');

router
  .route('/compiler/simpleRun')
  .post(
    secureApiCall([TEACHER]),
    compilerController.simpleRun
  )

router
  .route('/compiler/runCode')
  .post(
    secureApiCall([TEACHER, STUDENT]),
    compilerController.runCode
  )
router
  .route('/compiler/runEvaluation')
  .post(
    secureApiCall([TEACHER]),
    compilerController.runEvaluation
  )

module.exports = router;
