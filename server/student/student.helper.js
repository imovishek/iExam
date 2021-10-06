const Student = require('./student.model');
const Credential = require('../credential/credential.model');
const _ = require('underscore');
const bcrypt = require('bcryptjs');
const emailHelper = require('../email/email.helper');

// CREATE
exports.createStudent = async (student) => {
  const { credential } = student;
  const salt = await bcrypt.genSalt(10);
  credential.password = await bcrypt.hash(credential.password, salt);
  const cred = await Credential.create(credential);
  student.credential = cred;
  return Student.create(student);
}

// GET
exports.getStudentByID = (_id) =>
  Student.findOne({ _id });

exports.getStudents = (query, sort = { createdAt: -1 }) =>
  Student.find(query).sort(sort);


// UPDATE
exports.updateStudentByID = async (_id, body) => {
  if (body.credential) {
    const prevStudent = await Student.findOne({ _id });
    const update = {};
    const { email, password } = body.credential;
    if (email) update.email = email;
    if (password) update.password = password;

    await Credential.findOneAndUpdate({ email: prevStudent.credential.email }, update);
  }
  return Student.findOneAndUpdate({ _id }, body, { new: true });
}

exports.updateStudents = (query, body) =>
  Student.updateMany(query, body, { new: true });

// DELETE
exports.deleteStudentByID = async _id => {
  if (!_id) return null;
  const student = await Student.findOne({ _id });
  if (student && student.credential.email) {
    await Credential.findOneAndRemove({ email: student.credential.email });
  }
  return Student.findOneAndRemove({ _id });
}

exports.deleteStudents = query => {
  if (_.isEmpty(query)) return null;
  return Student.remove(query);
}

exports.createOrUpdateStudent = (students = [], user) => {
  return Promise.all(students.map(async student => {
    const oldStudentCount = await Student.find({
      'credential.email': student.credential.email
    }).countDocuments();
    if (oldStudentCount) return null;
    await Credential.create(student.credential);
    const emailBody = emailHelper.generateRegisterEmailBody(student.firstName, student.plainPassword);
    await emailHelper.sendMail(student.credential.email, 'Registration Successful', emailBody);
    return new Student(student).save();
  }));
}
