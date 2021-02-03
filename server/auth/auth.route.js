const express = require('express');
const router = express.Router();

const authController = require('./auth.controller');
router
  .route('/auth/login')
  .post(
    authController.authLogin
  )

module.exports = router;
