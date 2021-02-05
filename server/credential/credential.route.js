const express = require('express');
const router = express.Router();
const expressJWT = require('express-jwt');

const config = require('../../config/config');
const credentialController = require('./credential.controller');

router
  .route('/credentials')
  .get(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    credentialController.getCredentials
  ).post(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    credentialController.createCredential
  ).put(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    credentialController.updateCredentials
  ).delete(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    credentialController.deleteCredentials
  );

router
  .route('/credential/:id')
  .get(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    credentialController.getCredentialByID
  ).put(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    credentialController.updateCredentialByID
  ).delete(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    credentialController.deleteCredentialByID
  );


module.exports = router;
