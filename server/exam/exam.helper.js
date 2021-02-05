const Exam = require('./exam.model');
const _ = require('underscore');

// CREATE
exports.createExam = (exam) =>
  Exam.create(exam);

// GET
exports.getExamByID = (_id) =>
  Exam.findOne({ _id });

exports.getExams = (query) =>
  Exam.find(query);


// UPDATE
exports.updateExamByID = (_id, body) =>
  Exam.findOneAndUpdate({ _id }, body);

exports.updateExams = (query, body) =>
  Exam.updateMany(query, body);

// DELETE
exports.deleteExamByID = _id => {
  if (!_id) return null;
  return Exam.findOneAndRemove({ _id });
}

exports.deleteExams = query => {
  if (_.isEmpty(query)) return null;
  return Exam.remove(query);
}
