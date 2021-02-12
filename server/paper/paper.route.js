const express = require('express');
const router = express.Router();
const expressJWT = require('express-jwt');

const config = require('../../config/config');
const paperController = require('./paper.controller');

router
  .route('/papers')
  .get(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    paperController.getPapers
  ).post(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    paperController.createPaper
  ).put(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    paperController.updatePapers
  ).delete(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    paperController.deletePapers
  );

router
  .route('/paper/:id')
  .get(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    paperController.getPaperByID
  ).put(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    paperController.updatePaperByID
  ).delete(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    paperController.deletePaperByID
  );

router
  .route('/paper/:id/paper')
  .get(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    paperController.getPaperByIDWithUserPaper
  )


module.exports = router;
