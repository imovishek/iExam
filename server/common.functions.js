const fs = require('fs');
const moment = require('moment');
const Papa = require('papaparse');
const _ = require('underscore');
const { requiredCsvHeaders, inputDateFormats } = require('./constants');

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

  exports.mapCsvToStudent = (students = [], user) =>
  students.map(student => {
    const requiredHeaders = requiredCsvHeaders.STUDENT;
    if (_.any(requiredHeaders, header => !_.contains(Object.keys(student), header)))
      throw new Error('Some fields are missing');
    return {
      firstName: student['First Name'],
      lastName: student['Last Name'],
      registrationNo: student['Registration Number'],
      credential: {
        email: student["Email"],
        password: "$2a$10$mub9.N4UeLgLmwbr727hW.v1rZ0VTigz9LW/dPIGprM1Xi182wmom",
        userType: "student"
      },
      phoneNumber: student['Phone Number'],
      department: user.department
    };
  });
