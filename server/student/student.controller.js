const studentHelper = require('./student.helper');
const { httpStatuses } = require('../constants');
const { readCSV, mapCsvToStudent, removeFile } = require('../common.functions');
const fs = require('fs');
const Papa = require('papaparse');

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

exports.studentsFileUpload = async (req, res) => {
  const { filename, destination } = req.file;
  const { user } = req;
  const filePath = destination + filename;
  try {
    const students = await readCSV(filePath);
    students.splice(-1, 1);
    if (!students.length) throw new Error('Please select a valid file!');
    const mappedStudents = await mapCsvToStudent(students, user);
    let createdStudents = await studentHelper.createOrUpdateStudent(mappedStudents, user);
    createdStudents = createdStudents.filter(student => student);
    const studentIDs = createdStudents.map(student => student._id);
    res.status(httpStatuses.OK).send({ payload: { studentIDs } });
  } catch (err) {
    console.log(err.message);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
  removeFile(filePath);
}
