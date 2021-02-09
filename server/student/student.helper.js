const Student = require('./student.model');
const Credential = require('../credential/credential.model');
const _ = require('underscore');
const bcrypt = require('bcryptjs');

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

exports.getStudents = (query) =>
  Student.find(query);


// UPDATE
exports.updateStudentByID = async (_id, body) => {
  if (body.credential && body.credential.email) {
    const prevStudent = await Student.findOne({ _id });
    await Credential.findOneAndUpdate({ email: prevStudent.credential.email }, { email: body.credential.email });
  }
  return Student.findOneAndUpdate({ _id }, body, { new: true });
}

exports.updateStudents = (query, body) =>
  Student.updateMany(query, body, { new: true });

// DELETE
exports.deleteStudentByID = _id => {
  if (!_id) return null;
  return Student.findOneAndRemove({ _id });
}

exports.deleteStudents = query => {
  if (_.isEmpty(query)) return null;
  return Student.remove(query);
}
