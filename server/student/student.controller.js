const studentHelper = require('./student.helper');
const { httpStatuses } = require('../constants');

// GET STUDENT

exports.getStudents = async (req, res) => {
  const { query } = req;
  try {
    const result = await studentHelper.getStudents(query);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
      .status(httpStatuses.INTERNAL_SERVER_ERROR)
      .send({ error: true, message: err.message });
  }
};

exports.getStudentByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await studentHelper.getStudentByID(id);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};

exports.getStudentsByBatch = async (req, res) => {
  const { batch, departmentCode } = req.query;
  try {
    const result = await studentHelper.getStudents({ registrationNo: { $regex: new RegExp(`^${batch}`) }, 'department.departmentCode': departmentCode });
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};

// CREATE STUDENT
exports.createStudent = async (req, res) => {
  const { student } = req.body;
  try {
    const result = await studentHelper.createStudent(student);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};

// UPDATE STUDENT
exports.updateStudents = async (req, res) => {
  const { query, body } = req;
  try {
    const result = await studentHelper.updateStudents(query, body);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};

exports.updateStudentByID = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const result = await studentHelper.updateStudentByID(id, body.update);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};


// DELETE STUDENT
exports.deleteStudents = async (req, res) => {
  const { query } = req;
  try {
    const result = await studentHelper.deleteStudents(query);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};

exports.deleteStudentByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await studentHelper.deleteStudentByID(id);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};
