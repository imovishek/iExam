const credentialHelper = require('./credential.helper');
const { httpStatuses } = require('../constants');

// GET CREDENTIAL

exports.getCredentials = async (req, res) => {
  const { query } = req;
  try {
    const result = await credentialHelper.getCredentials(query);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
      .status(httpStatuses.INTERNAL_SERVER_ERROR)
      .send({ error: true, message: err.message });
  }
};

exports.getCredentialByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await credentialHelper.getCredentialByID(id);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};

// CREATE CREDENTIAL
exports.createCredential = async (req, res) => {
  const { credential } = req.body;
  try {
    const result = await credentialHelper.createCredential(credential);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};

// UPDATE CREDENTIAL
exports.updateCredentials = async (req, res) => {
  const { query, body } = req;
  try {
    const result = await credentialHelper.updateCredentials(query, body);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};

exports.updateCredentialByID = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const result = await credentialHelper.updateCredentialByID(id, body.update);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};


// DELETE CREDENTIAL
exports.deleteCredentials = async (req, res) => {
  const { query } = req;
  try {
    const result = await credentialHelper.deleteCredentials(query);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};

exports.deleteCredentialByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await credentialHelper.deleteCredentialByID(id);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};
