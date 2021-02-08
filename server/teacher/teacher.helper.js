const Teacher = require('./teacher.model');
const _ = require('underscore');
const bcryptjs = require('bcryptjs');
function hash(password) {
  return bcryptjs.hash(password, 10);
}
// CREATE
exports.createTeacher = async (teacher) => {
  const { credential } = teacher;
  credential.password = hash(credential.password);
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
exports.updateTeacherByID = (_id, body) =>
  Teacher.findOneAndUpdate({ _id }, body, { new: true });

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
