const Exam = require('./exam.model');
const _ = require('underscore');

// CREATE
exports.createExam = (exam) =>
  Exam.create(exam);

// GET
exports.getExamByID = (_id) =>
  Exam.findOne({ _id })
    .populate("course")
    .populate("questions")
    .populate("participants")
    .populate("bannedParticipants");


exports.getExams = (query) =>
  Exam.find(query)
    .populate("course")
    .populate("questions")
    .populate("participants")
    .populate("bannedParticipants");


// UPDATE
exports.updateExamByID = (_id, body) =>
  Exam.findOneAndUpdate({ _id }, body, { new: true });

exports.updateExams = (query, body) =>
  Exam.updateMany(query, body, { new: true });

// DELETE
exports.deleteExamByID = _id => {
  if (!_id) return null;
  return Exam.findOneAndRemove({ _id });
}

exports.deleteExams = query => {
  if (_.isEmpty(query)) return null;
  return Exam.remove(query);
}
