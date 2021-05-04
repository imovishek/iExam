const Clarification = require('./clarification.model');
const _ = require('underscore');

// CREATE
exports.createClarification = (clarification) =>
  Clarification.create(clarification);

// GET
exports.getClarificationByID = (_id) =>
  Clarification.findOne({ _id })


exports.getClarifications = (query, sort = { askTime: -1 }) =>
  Clarification.find(query).sort(sort);


// UPDATE
exports.updateClarificationByID = (_id, body) =>
  Clarification.findOneAndUpdate({ _id }, body, { new: true });

exports.updateClarifications = (query, body) =>
  Clarification.updateMany(query, body, { new: true });

// DELETE
exports.deleteClarificationByID = _id => {
  if (!_id) return null;
  return Clarification.findOneAndRemove({ _id });
}

exports.deleteClarifications = query => {
  if (_.isEmpty(query)) return null;
  return Clarification.remove(query);
}
