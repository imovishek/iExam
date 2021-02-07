const Question = require('./question.model');
const _ = require('underscore');

// CREATE
exports.createQuestion = (question) =>
  Question.create(question);

// GET
exports.getQuestionByID = (_id) =>
  Question.findOne({ _id });

exports.getQuestions = (query) =>
  Question.find(query);


// UPDATE
exports.updateQuestionByID = (_id, body) =>
  Question.findOneAndUpdate({ _id }, body, { new: true });

exports.updateQuestions = (query, body) =>
  Question.updateMany(query, body, { new: true });

// DELETE
exports.deleteQuestionByID = _id => {
  if (!_id) return null;
  return Question.findOneAndRemove({ _id });
}

exports.deleteQuestions = query => {
  if (_.isEmpty(query)) return null;
  return Question.remove(query);
}
