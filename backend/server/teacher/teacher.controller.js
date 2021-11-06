const teacherHelper = require("./teacher.helper");
const { httpStatuses, STUDENT, TEACHER } = require("../constants");
const {
  readCSV,
  mapCsvToTeacher,
  removeFile,
  getEightDigitRandomPassword,
} = require("../common.functions");
const responseHandler = require("../middlewares/responseHandler");
const emailHelper = require("../email/email.helper");

// GET TEACHER

exports.getTeachers = async (req, res) => {
  const { query } = req;
  try {
    const result = await teacherHelper.getTeachers(query);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, {
      error: true,
      message: err.message,
    });
  }
};

exports.getTeacherByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await teacherHelper.getTeacherByID(id);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, {
      error: true,
      message: err.message,
    });
  }
};

// CREATE TEACHER
exports.createTeacher = async (req, res) => {
  const { teacher } = req.body;
  try {
    const { credential } = teacher;
    const randomPassword = getEightDigitRandomPassword();
    credential.password = randomPassword;
    credential.userType = TEACHER;
    const result = await teacherHelper.createTeacher(teacher);
    const emailBody = emailHelper.generateRegisterEmailBody(
      teacher.firstName,
      randomPassword
    );
    await emailHelper.sendMail(
      credential.email,
      "Registration Successful",
      emailBody
    );
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, {
      error: true,
      message: err.message,
    });
  }
};

// UPDATE TEACHER
exports.updateTeachers = async (req, res) => {
  const { query, body } = req;
  try {
    const result = await teacherHelper.updateTeachers(query, body);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, {
      error: true,
      message: err.message,
    });
  }
};

exports.updateTeacherByID = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const result = await teacherHelper.updateTeacherByID(id, body.update);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, {
      error: true,
      message: err.message,
    });
  }
};

// DELETE TEACHER
exports.deleteTeachers = async (req, res) => {
  const { query } = req;
  try {
    const result = await teacherHelper.deleteTeachers(query);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, {
      error: true,
      message: err.message,
    });
  }
};

exports.deleteTeacherByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await teacherHelper.deleteTeacherByID(id);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, {
      error: true,
      message: err.message,
    });
  }
};

exports.teachersFileUpload = async (req, res) => {
  const { filename, destination } = req.file;
  const { user } = req;
  const filePath = destination + filename;
  try {
    const teachers = await readCSV(filePath);
    teachers.splice(-1, 1);
    if (!teachers.length) throw new Error("Please select a valid file!");
    const mappedTeachers = await mapCsvToTeacher(teachers, user);
    let createdTeachers = await teacherHelper.createOrUpdateTeacher(
      mappedTeachers,
      user
    );
    createdTeachers = createdTeachers.filter((teacher) => teacher);
    const teacherIDs = createdTeachers.map((teacher) => teacher._id);
    responseHandler(res, httpStatuses.OK, { payload: { teacherIDs } });
  } catch (err) {
    console.log(err.message);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, {
      error: true,
      message: err.message,
    });
  }
  removeFile(filePath);
};
