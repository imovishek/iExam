const express = require('express');
const { TEACHER } = require('../constants');
const router = express.Router();
const secureApiCall = require('../middlewares/secureApiCall');
const paperController = require('./paper.controller');

router
  .route('/papers')
  .get(
    secureApiCall([TEACHER]),
    paperController.getPapers
  ).post(
    secureApiCall([TEACHER]),
    paperController.createPaper
  ).put(
    secureApiCall([TEACHER]),
    paperController.updatePapers
  ).delete(
    secureApiCall([TEACHER]),
    paperController.deletePapers
  );

router
  .route('/paper/:id')
  .get(
    secureApiCall([TEACHER]),
    paperController.getPaperByID
  ).put(
    secureApiCall([TEACHER]),
    paperController.updatePaperByID
  ).delete(
    secureApiCall([TEACHER]),
    paperController.deletePaperByID
  );

router
  .route('/paper/:id/paper')
  .get(
    secureApiCall([TEACHER]),
    paperController.getPaperByIDWithUserPaper
  )


module.exports = router;
