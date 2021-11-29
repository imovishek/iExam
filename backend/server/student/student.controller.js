const studentHelper = require("./student.helper");
const { httpStatuses, STUDENT } = require("../constants");
const { parse } = require("json2csv");
const {
  readCSV,
  mapCsvToStudent,
  removeFile,
  getEightDigitRandomPassword,
} = require("../common.functions");
const responseHandler = require("../middlewares/responseHandler");
const emailHelper = require("../email/email.helper");

// GET STUDENT

exports.getStudents = async (req, res) => {
  const { query } = req;
  try {
    const result = await studentHelper.getStudents(query);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, {
      error: true,
      message: err.message,
    });
  }
};

exports.getStudentByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await studentHelper.getStudentByID(id);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, {
      error: true,
      message: err.message,
    });
  }
};

exports.getStudentsByBatch = async (req, res) => {
  const { batch, departmentCode, oddEven } = req.query;
  try {
    let result = await studentHelper.getStudents({
      registrationNo: { $regex: new RegExp(`^${batch}`) },
      "department.departmentCode": departmentCode,
    });
    try {
      result = result.toObject();
    } catch (e) {}
    if (oddEven && oddEven !== "all") {
      result = result.filter((st) => {
        const regNo = Number(st.registrationNo);
        if (oddEven === "odd") return regNo % 2 === 1;
        else return regNo % 2 === 0;
      });
    }
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, {
      error: true,
      message: err.message,
    });
  }
};

// CREATE STUDENT
exports.createStudent = async (req, res) => {
  const { student } = req.body;
  const { credential } = student;
  try {
    const randomPassword = getEightDigitRandomPassword();
    credential.password = randomPassword;
    credential.userType = STUDENT;
    const result = await studentHelper.createStudent(student);
    const emailBody = emailHelper.generateRegisterEmailBody(
      student.firstName,
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

// UPDATE STUDENT
exports.updateStudents = async (req, res) => {
  const { query, body } = req;
  try {
    const result = await studentHelper.updateStudents(query, body);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, {
      error: true,
      message: err.message,
    });
  }
};

exports.updateStudentByID = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const result = await studentHelper.updateStudentByID(id, body.update);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, {
      error: true,
      message: err.message,
    });
  }
};

// DELETE STUDENT
exports.deleteStudents = async (req, res) => {
  const { query } = req;
  try {
    const result = await studentHelper.deleteStudents(query);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, {
      error: true,
      message: err.message,
    });
  }
};

exports.deleteStudentByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await studentHelper.deleteStudentByID(id);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, {
      error: true,
      message: err.message,
    });
  }
};

exports.studentsFileUpload = async (req, res) => {
  const { filename, destination } = req.file;
  const { user } = req;
  const filePath = destination + filename;
  try {
    const students = await readCSV(filePath);
    students.splice(-1, 1);
    if (!students.length) throw new Error("Please select a valid file!");
    const mappedStudents = await mapCsvToStudent(students, user);
    const data = mappedStudents.map((e) => ({
      email: e.credential.email,
      password: e.plainPassword,
      registrationNo: e.registrationNo,
    }));

    const fields = ["registrationNo", "email", "password"];
    const fieldNames = ["Registration Number", "Email", "Password"];
    const opts = { fields, fieldNames };
    const down_file = parse(data, opts);
    console.log({ data, down_file });
    let createdStudents = await studentHelper.createOrUpdateStudent(
      mappedStudents,
      user
    );
    createdStudents = createdStudents.filter((student) => student);
    const studentIDs = createdStudents.map((student) => student._id);
    res.setHeader("Content-disposition", "attachment; filename=data.csv");
    res.set("Content-Type", "text/csv");
    res.status(200).send(down_file);
  } catch (err) {
    console.log(err.message);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, {
      error: true,
      message: err.message,
    });
  }
  removeFile(filePath);
};
