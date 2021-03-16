const Exam = require('./exam.model');
const _ = require('underscore');
const { filter } = require('underscore');
const mongoose = require('mongoose');

// CREATE
exports.createExam = (exam) =>
  Exam.create(exam);

// GET
exports.getExamByID = (_id) =>
  Exam.findOne({ _id })
    .populate({
      path: "course",
      populate: {
        path: "assignedTeacher",
        model: "Teacher"
      }
    })
    .populate("questions")
    .populate("participants")
    .populate("bannedParticipants")
    .populate("papers");


exports.getExams = (query, sort = { createdAt: -1 }) =>
  Exam.find(query)
    .populate({
      path: "course",
      populate: {
        path: "assignedTeacher",
        model: "Teacher"
      }
    })
    .populate("questions")
    .populate("participants")
    .populate("bannedParticipants")
    .populate("papers")
    .sort(sort);
exports.getExamAggregate = async (id, filter) =>
    Exam.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        }
      },
      {
        $project: {
          ...filter
        }
      }
    ])

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
