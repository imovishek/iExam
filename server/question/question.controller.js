const questionHelper = require('./question.helper');
const { httpStatuses } = require('../constants');
const responseHandler = require('../middlewares/responseHandler');

// GET QUESTION

exports.getQuestions = async (req, res) => {
  const { query } = req;
  try {
    const result = await questionHelper.getQuestions(query);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.getQuestionByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await questionHelper.getQuestionByID(id);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

// CREATE QUESTION
exports.createQuestion = async (req, res) => {
  const { question } = req.body;
  try {
    const result = await questionHelper.createQuestion(question);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

// UPDATE QUESTION
exports.updateQuestions = async (req, res) => {
  const { query, body } = req;
  try {
    const result = await questionHelper.updateQuestions(query, body);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.updateQuestionByID = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const result = await questionHelper.updateQuestionByID(id, body.update);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};


// DELETE QUESTION
exports.deleteQuestions = async (req, res) => {
  const { query } = req;
  try {
    const result = await questionHelper.deleteQuestions(query);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.deleteQuestionByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await questionHelper.deleteQuestionByID(id);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};
