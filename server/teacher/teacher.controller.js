const teacherHelper = require('./teacher.helper');
const { httpStatuses } = require('../constants');
const fs = require('fs');
const Papa = require('papaparse');
const { readCSV, mapCsvToTeacher, removeFile } = require('../common.functions');

// GET TEACHER

exports.getTeachers = async (req, res) => {
  const { query } = req;
  try {
    const result = await teacherHelper.getTeachers(query);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
      .status(httpStatuses.INTERNAL_SERVER_ERROR)
      .send({ error: true, message: err.message });
  }
};

exports.getTeacherByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await teacherHelper.getTeacherByID(id);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};

// CREATE TEACHER
exports.createTeacher = async (req, res) => {
  const { teacher } = req.body;
  try {
    const result = await teacherHelper.createTeacher(teacher);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};

// UPDATE TEACHER
exports.updateTeachers = async (req, res) => {
  const { query, body } = req;
  try {
    const result = await teacherHelper.updateTeachers(query, body);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};

exports.updateTeacherByID = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const result = await teacherHelper.updateTeacherByID(id, body.update);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};


// DELETE TEACHER
exports.deleteTeachers = async (req, res) => {
  const { query } = req;
  try {
    const result = await teacherHelper.deleteTeachers(query);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};

exports.deleteTeacherByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await teacherHelper.deleteTeacherByID(id);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};

exports.teachersFileUpload = async (req, res) => {
  const { filename, destination } = req.file;
  const { user } = req;
  const filePath = destination + filename;
  try {
    const teachers = await readCSV(filePath);
    teachers.splice(-1, 1);
    if (!teachers.length) throw new Error('Please select a valid file!');
    const mappedTeachers = mapCsvToTeacher(teachers, user);
    let createdTeachers = await teacherHelper.createOrUpdateTeacher(mappedTeachers, user);
    createdTeachers = createdTeachers.filter(teacher => teacher);
    const teacherIDs = createdTeachers.map(teacher => teacher._id);
    res.status(httpStatuses.OK).send({ payload: { teacherIDs } });
  } catch (err) {
    console.log(err.message);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
  removeFile(filePath);
}