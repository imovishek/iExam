const examHelper = require('./exam.helper');
const { httpStatuses } = require('../constants');

// GET EXAM

exports.getExams = async (req, res) => {
  const { query } = req;
  try {
    const result = await examHelper.getExams(query);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
      .status(httpStatuses.INTERNAL_SERVER_ERROR)
      .send({ error: true, message: err.message });
  }
};

exports.getExamByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await examHelper.getExamByID(id);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};

// CREATE EXAM
exports.createExam = async (req, res) => {
  const { exam } = req.body;
  try {
    const result = await examHelper.createExam(exam);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};

// UPDATE EXAM
exports.updateExams = async (req, res) => {
  const { query, body } = req;
  try {
    const result = await examHelper.updateExams(query, body);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};

exports.updateExamByID = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const result = await examHelper.updateExamByID(id, body.update);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};


// DELETE EXAM
exports.deleteExams = async (req, res) => {
  const { query } = req;
  try {
    const result = await examHelper.deleteExams(query);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};

exports.deleteExamByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await examHelper.deleteExamByID(id);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};
