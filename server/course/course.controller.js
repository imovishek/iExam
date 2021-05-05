const courseHelper = require('./course.helper');
const { httpStatuses } = require('../constants');
const _ = require('underscore');
const { parseQuery, readCSV, mapCsvToCourse, removeFile } = require('../common.functions');
const fs = require('fs');
const Papa = require('papaparse');

// GET COURSE

exports.getCourses = async (req, res) => {
  const { query } = req;
  try {
    const result = await courseHelper.getCourses(query);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
      .status(httpStatuses.INTERNAL_SERVER_ERROR)
      .send({ error: true, message: err.message });
  }
};

exports.getCourseByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await courseHelper.getCourseByID(id).lean();
    result.enrolledStudents.reverse();
    result.pendingEnrollStudents.reverse();
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};

// CREATE COURSE
exports.createCourse = async (req, res) => {
  const { course } = req.body;
  try {
    const result = await courseHelper.createCourse(course);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};

// UPDATE COURSE
exports.updateCourses = async (req, res) => {
  const { query, body } = req;
  const { _id } = query;
  if (_id) query._id = parseQuery(_id);

  try {
    const result = await courseHelper.updateCourses(query, body);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};

exports.updateCourseByID = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const result = await courseHelper.updateCourseByID(id, body.update);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};


// DELETE COURSE
exports.deleteCourses = async (req, res) => {
  const { query } = req;
  try {
    const result = await courseHelper.deleteCourses(query);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};

exports.deleteCourseByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await courseHelper.deleteCourseByID(id);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};

exports.coursesFileUpload = async (req, res) => {
  const { filename, destination } = req.file;
  const { user } = req;
  const filePath = destination + filename;
  try {
    const courses = await readCSV(filePath);
    courses.splice(-1, 1);
    const mappedCourses = mapCsvToCourse(courses, user);
    let createdCourses = await courseHelper.createOrUpdateCourse(mappedCourses, user);
    createdCourses = createdCourses.filter(course => course);
    const courseIDs = createdCourses.map(course => course._id);
    res.status(httpStatuses.OK).send({ payload: { courseIDs } });
  } catch (err) {
    console.log(err.message);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
  removeFile(filePath);
}