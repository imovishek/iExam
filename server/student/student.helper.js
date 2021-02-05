const Student = require('./student.model');
const _ = require('underscore');

// CREATE
exports.createStudent = (student) =>
  Student.create(student);

// GET
exports.getStudentByID = (_id) =>
  Student.findOne({ _id });

exports.getStudents = (query) =>
  Student.find(query);


// UPDATE
exports.updateStudentByID = (_id, body) =>
  Student.findOneAndUpdate({ _id }, body);

exports.updateStudents = (query, body) =>
  Student.updateMany(query, body);

// DELETE
exports.deleteStudentByID = _id => {
  if (!_id) return null;
  return Student.findOneAndRemove({ _id });
}

exports.deleteStudents = query => {
  if (_.isEmpty(query)) return null;
  return Student.remove(query);
}
