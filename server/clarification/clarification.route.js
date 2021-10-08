const express = require('express');
const { TEACHER, STUDENT } = require('../constants');
const router = express.Router();
const secureApiCall = require('../middlewares/secureApiCall');


const clarificationController = require('./clarification.controller');

router
  .route('/clarifications')
  .get(
    secureApiCall([TEACHER, STUDENT]),
    clarificationController.getClarifications
  ).post(
    secureApiCall([TEACHER, STUDENT]),
    clarificationController.createClarification
  ).put(
    secureApiCall([TEACHER, STUDENT]),
    clarificationController.updateClarifications
  ).delete(
    secureApiCall([TEACHER]),
    clarificationController.deleteClarifications
  );

router
  .route('/clarification/:id')
  .get(
    secureApiCall([TEACHER]),
    clarificationController.getClarificationByID
  ).put(
    secureApiCall([TEACHER]),
    clarificationController.updateClarificationByID
  ).delete(
    secureApiCall([TEACHER]),
    clarificationController.deleteClarificationByID
  );

router
  .route('/clarification/:id/clarification')
  .get(
    secureApiCall([TEACHER]),
    clarificationController.getClarificationByIDWithUserClarification
  )


module.exports = router;
