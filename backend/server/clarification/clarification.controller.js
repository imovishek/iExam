const clarificationHelper = require('./clarification.helper');
const { httpStatuses } = require('../constants');
const _ = require('underscore');
const responseHandler = require('../middlewares/responseHandler');

// GET CLARIFICATION

exports.getClarifications = async (req, res) => {
  const { query } = req;
  try {
    const result = await clarificationHelper.getClarifications(query);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.getClarificationByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await clarificationHelper.getClarificationByID(id);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.getClarificationByIDWithUserClarification = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  console.log(id, _id);
  try {
    const result = await clarificationHelper.getClarificationByID(id);
    const clarifications = _.filter(result.clarifications, clarification => clarification.student._id === req.user._id);
    let clarification = null;
    if (clarifications.length === 1) clarification = clarifications[0];
    responseHandler(res, httpStatuses.OK, { payload: { clarification: result, clarification } });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

// CREATE CLARIFICATION
exports.createClarification = async (req, res) => {
  const { clarification } = req.body;
  try {
    const result = await clarificationHelper.createClarification(clarification);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

// UPDATE CLARIFICATION
exports.updateClarifications = async (req, res) => {
  const { query, body } = req;
  try {
    const result = await clarificationHelper.updateClarifications(query, body);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.updateClarificationByID = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const result = await clarificationHelper.updateClarificationByID(id, body.update);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};


// DELETE CLARIFICATION
exports.deleteClarifications = async (req, res) => {
  const { query } = req;
  try {
    const result = await clarificationHelper.deleteClarifications(query);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.deleteClarificationByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await clarificationHelper.deleteClarificationByID(id);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};
