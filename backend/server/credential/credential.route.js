const express = require('express');
const { DEPTADMIN } = require('../constants');
const router = express.Router();
const secureApiCall = require('../middlewares/secureApiCall');


const credentialController = require('./credential.controller');

router
  .route('/credentials')
  .get(
    secureApiCall([DEPTADMIN]),
    credentialController.getCredentials
  ).post(
    secureApiCall([]),
    credentialController.createCredential
  ).put(
    secureApiCall([]),
    credentialController.updateCredentials
  ).delete(
    secureApiCall([]),
    credentialController.deleteCredentials
  );

router
  .route('/credential/:id')
  .get(
    secureApiCall([]),
    credentialController.getCredentialByID
  ).put(
    secureApiCall([]),
    credentialController.updateCredentialByID
  ).delete(
    secureApiCall([]),
    credentialController.deleteCredentialByID
  );


module.exports = router;
