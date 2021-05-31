const fs = require('fs');
const moment = require('moment');
const Papa = require('papaparse');
const bcrypt = require('bcryptjs');
const _ = require('underscore');
const {
  requiredCsvHeaders,
  inputDateFormats,
  timeFormat,
  STUDENT,
  RUNNING,
  ENDED,
  UPCOMING,
} = require('./constants');

exports.parseQuery = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

exports.parseObject = (obj) => {
  Object.keys(obj).map((key) => {
    obj[key] = this.parseQuery(obj[key]);
  });
  return obj;
};

exports.readCSV = async (filePath) => {
  const csvFile = fs.readFileSync(filePath)
  const csvData = csvFile.toString().replace(/\s*,\s*/g, ","); 
  return new Promise(resolve => {
    Papa.parse(csvData, {
      header: true,
      complete: results => {
        console.log('Complete', results.data.length, 'records.'); 
        resolve(results.data);
      }
    });
  });
};

exports.removeFile = (filePath) => {
  fs.unlinkSync(filePath);
}

exports.mapCsvToCourse = (courses = [], user) =>
  courses.map(course => {
    const requiredHeaders = requiredCsvHeaders.COURSE;
    if (_.any(requiredHeaders, header => !_.contains(Object.keys(course), header)))
      throw new Error('Some fields are missing');
    return {
      title: course['Course Title'],
      courseCode: course['Course Code'],
      department: user.department,
      exams: [],
      enrolledStudents: [],
      pendingEnrollStudents: [],
      assignedTeacher: null,
      startDate: moment(course['Start Date'], inputDateFormats),
      batchCode: course['Batch'],
      status: course['Status'].toLowerCase(),
      announcements: [],
    };
  });

exports.mapCsvToStudent = async (students = [], user) =>
  Promise.all(students.map(async student => {
    const requiredHeaders = requiredCsvHeaders.STUDENT;
    if (_.any(requiredHeaders, header => !_.contains(Object.keys(student), header)))
      throw new Error('Some fields are missing');
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(student['Registration Number'], salt);
    return {
      firstName: student['First Name'],
      lastName: student['Last Name'],
      registrationNo: student['Registration Number'],
      credential: {
        email: student["Email"],
        password,
        userType: "student"
      },
      phoneNumber: student['Phone Number'],
      department: user.department
    };
  }));

exports.mapCsvToTeacher = (teachers = [], user) =>
  teachers.map(teacher => {
    const requiredHeaders = requiredCsvHeaders.TEACHER;
    if (_.any(requiredHeaders, header => !_.contains(Object.keys(teacher), header)))
      throw new Error('Some fields are missing');
    return {
      firstName: teacher['First Name'],
      lastName: teacher['Last Name'],
      shortName: teacher['Short Name'],
      designation: teacher['Designation'],
      credential: {
        email: teacher["Email"],
        password: "$2a$10$mub9.N4UeLgLmwbr727hW.v1rZ0VTigz9LW/dPIGprM1Xi182wmom",
        userType: "teacher"
      },
      phoneNumber: teacher['Phone Number'],
      department: user.department
    };
  });

  
exports.getExamStatus = (exam = {}) => {
  const { startDate = "", startTime = "", duration = "" } = exam;
  const dateString = moment(startDate).format("YYYY-MM-DD");
  const timeString = moment(startTime, timeFormat).format("HH:mm:ss");
  const startDateWithTime = new Date(`${dateString} ${timeString}`);
  if (moment(new Date()).isAfter(moment(startDateWithTime))) {
    const diffInMinutes = moment(new Date()).diff(startDateWithTime, "minutes");
    const hh = duration.split(":")[0];
    const mm = duration.split(":")[1];
    const durationTime = Number(Number(hh) * 60) + Number(mm);
    if (diffInMinutes < durationTime) return RUNNING;
    return ENDED;
  }
  return UPCOMING;
};

exports.cleanExamForStudent = (req, exam, shouldDeleteQuestions = false) => {
  if (req.user.userType !== STUDENT) return;
  if (shouldDeleteQuestions) exam.questions = [];
  exam.questions = (exam.questions || []).map(question => {
    if (typeof question === 'string') return 'questionID';
    ((question.matchingOptions || {}).leftSide || []).forEach(left => {
      delete left.matchingID;
    });
    (question.options || []).forEach(option => delete option.isAnswer);
    const {
      _id,
      title,
      marks,
      type,
      options,
      body,
      matchingOptions,
    } = question;
    return {
      _id,
      title,
      marks,
      type,
      options,
      body,
      matchingOptions,
    };
  })
  const status = this.getExamStatus(exam);
  exam.status = status;
  console.log('should see exam', status, exam.shouldNotSeePaperAfterEnded);
  if (status !== RUNNING && (status !== ENDED || exam.shouldNotSeePaperAfterEnded)) {
    exam.questions = [];
  }
  delete exam.papers;
}


exports.cleanCourseForStudent = (req, course) => {
  if (req.user.userType !== STUDENT) return;
  _.forEach(course.exams, exam => this.cleanExamForStudent(req, exam, true));
  delete course.pendingEnrollStudents;
  delete course.enrolledStudents;
}

exports.checkEqual = (objA, objB) => {
  if (objA === objB) return true; // undefined, null, string, number
  if (objA === null || objB === null) return false;
  if (objA === undefined || objB === undefined) return false;

  // object or array
  if (typeof objA !== typeof objB) return false;
  if (typeof objA !== 'object') return objA === objB;
  if (Array.isArray(objA) !== Array.isArray(objB)) return false;
  const objAKeys = Object.keys(objA);
  const objBKeys = Object.keys(objB);
  const aKeysString = objAKeys.sort().join('#');
  const bKeysString = objBKeys.sort().join('#');
  if (aKeysString !== bKeysString) return false; // checking keys are equal
  if (objAKeys.length !== objBKeys.length) return false;
  for (const key of objAKeys) {
    if (!this.checkEqual(objA[key], objB[key])) return false;
  }
  return true;
}
