const paperHelper = require('./paper.helper');
const { httpStatuses } = require('../constants');
const _ = require('underscore');
const responseHandler = require('../middlewares/responseHandler');

// GET PAPER

exports.getPapers = async (req, res) => {
  const { query } = req;
  try {
    const result = await paperHelper.getPapers(query);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.getPaperByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await paperHelper.getPaperByID(id);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.getPaperByIDWithUserPaper = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  console.log(id, _id);
  try {
    const result = await paperHelper.getPaperByID(id);
    const papers = _.filter(result.papers, paper => paper.student._id === req.user._id);
    let paper = null;
    if (papers.length === 1) paper = papers[0];
    responseHandler(res, httpStatuses.OK, { payload: { paper: result, paper } });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

// CREATE PAPER
exports.createPaper = async (req, res) => {
  const { paper } = req.body;
  try {
    const result = await paperHelper.createPaper(paper);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

// UPDATE PAPER
exports.updatePapers = async (req, res) => {
  const { query, body } = req;
  try {
    const result = await paperHelper.updatePapers(query, body);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.updatePaperByID = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const result = await paperHelper.updatePaperByID(id, body.update);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};


// DELETE PAPER
exports.deletePapers = async (req, res) => {
  const { query } = req;
  try {
    const result = await paperHelper.deletePapers(query);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.deletePaperByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await paperHelper.deletePaperByID(id);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};
