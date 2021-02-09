const Teacher = require('./teacher.model');
const Credential = require('../credential/credential.model');
const _ = require('underscore');
const bcrypt = require('bcryptjs');


// CREATE
exports.createTeacher = async (teacher) => {
  const { credential } = teacher;
  const salt = await bcrypt.genSalt(10);
  credential.password = await bcrypt.hash(credential.password, salt);
  const cred = await Credential.create(credential);
  teacher.credential = cred;
  return Teacher.create(teacher);
}

// GET
exports.getTeacherByID = (_id) =>
  Teacher.findOne({ _id });

exports.getTeachers = (query) =>
  Teacher.find(query);


// UPDATE
exports.updateTeacherByID = async (_id, body) => {
  if (body.credential && body.credential.email) {
    const prevTeacher = await Teacher.findOne({ _id });
    await Credential.findOneAndUpdate({ email: prevTeacher.credential.email }, { email: body.credential.email });
  }
  return Teacher.findOneAndUpdate({ _id }, body, { new: true });
}

exports.updateTeachers = (query, body) =>
  Teacher.updateMany(query, body, { new: true });

// DELETE
exports.deleteTeacherByID = _id => {
  if (!_id) return null;
  return Teacher.findOneAndRemove({ _id });
}

exports.deleteTeachers = query => {
  if (_.isEmpty(query)) return null;
  return Teacher.remove(query);
}
