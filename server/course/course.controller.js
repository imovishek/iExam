const courseHelper = require('./course.helper');
const { httpStatuses, STUDENT } = require('../constants');
const _ = require('underscore');
const { parseQuery, readCSV, mapCsvToCourse, removeFile, cleanCourseForStudent } = require('../common.functions');
const fs = require('fs');
const Papa = require('papaparse');
const responseHandler = require('../middlewares/responseHandler');

// GET COURSE

exports.getCourses = async (req, res) => {
  const { query } = req;
  try {
    const result = await courseHelper.getCourses(query);
    _.forEach(result, course => cleanCourseForStudent(req, course));
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res. httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.getCourseByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await courseHelper.getCourseByID(id).lean();
    result.enrolledStudents.reverse();
    result.pendingEnrollStudents.reverse();
    cleanCourseForStudent(req, result);

    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res. httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

// CREATE COURSE
exports.createCourse = async (req, res) => {
  const { course } = req.body;
  try {
    const result = await courseHelper.createCourse(course);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res. httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

// UPDATE COURSE
exports.updateCourses = async (req, res) => {
  const { query, body } = req;
  const { _id } = query;
  if (_id) query._id = parseQuery(_id);

  try {
    const result = await courseHelper.updateCourses(query, body);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res. httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.updateCourseByID = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const result = await courseHelper.updateCourseByID(id, body.update);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res. httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};


// DELETE COURSE
exports.deleteCourses = async (req, res) => {
  const { query } = req;
  try {
    const result = await courseHelper.deleteCourses(query);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res. httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.deleteCourseByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await courseHelper.deleteCourseByID(id);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res. httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.coursesFileUpload = async (req, res) => {
  const { filename, destination } = req.file;
  const { user } = req;
  const filePath = destination + filename;
  try {
    const courses = await readCSV(filePath);
    courses.splice(-1, 1);
    if (!courses.length) throw new Error('Please select a valid file!');
    const mappedCourses = mapCsvToCourse(courses, user);
    let createdCourses = await courseHelper.createOrUpdateCourse(mappedCourses, user);
    createdCourses = createdCourses.filter(course => course);
    const courseIDs = createdCourses.map(course => course._id);
    responseHandler(res, httpStatuses.OK, { payload: courseIDs });
  } catch (err) {
    console.log(err.message);
    responseHandler(res. httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
  removeFile(filePath);
}

exports.enrollMeRequest = async (req, res) => {
  try {
    const { courseID } = req.params;
    await courseHelper.updateCourseByID(courseID, {
      $addToSet: {
        pendingEnrollStudents: req.user._id,
      }
    })
    responseHandler(res, httpStatuses.OK, { msg: 'Enrollment Request Sent' });
  } catch (err) {
    console.log(err.message);
    responseHandler(res. httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
}
