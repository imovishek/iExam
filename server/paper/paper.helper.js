const Paper = require('./paper.model');
const _ = require('underscore');

// CREATE
exports.createPaper = (paper) =>
  Paper.create(paper);

// GET
exports.getPaperByID = (_id) =>
  Paper.findOne({ _id })
    .populate("course")
    .populate("questions")
    .populate("participants")
    .populate("bannedParticipants");


exports.getPapers = (query) =>
  Paper.find(query)
    .populate("course")
    .populate("questions")
    .populate("participants")
    .populate("bannedParticipants");


// UPDATE
exports.updatePaperByID = (_id, body) =>
  Paper.findOneAndUpdate({ _id }, body, { new: true });

exports.updatePapers = (query, body) =>
  Paper.updateMany(query, body, { new: true });

// DELETE
exports.deletePaperByID = _id => {
  if (!_id) return null;
  return Paper.findOneAndRemove({ _id });
}

exports.deletePapers = query => {
  if (_.isEmpty(query)) return null;
  return Paper.remove(query);
}
