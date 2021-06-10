const credentialHelper = require('./credential.helper');
const { httpStatuses } = require('../constants');
const responseHandler = require('../middlewares/responseHandler');

// GET CREDENTIAL

exports.getCredentials = async (req, res) => {
  const { query } = req;
  try {
    const result = await credentialHelper.getCredentials(query);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.getCredentialByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await credentialHelper.getCredentialByID(id);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

// CREATE CREDENTIAL
exports.createCredential = async (req, res) => {
  const { credential } = req.body;
  try {
    const result = await credentialHelper.createCredential(credential);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

// UPDATE CREDENTIAL
exports.updateCredentials = async (req, res) => {
  const { query, body } = req;
  try {
    const result = await credentialHelper.updateCredentials(query, body);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.updateCredentialByID = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const result = await credentialHelper.updateCredentialByID(id, body.update);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};


// DELETE CREDENTIAL
exports.deleteCredentials = async (req, res) => {
  const { query } = req;
  try {
    const result = await credentialHelper.deleteCredentials(query);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.deleteCredentialByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await credentialHelper.deleteCredentialByID(id);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};
