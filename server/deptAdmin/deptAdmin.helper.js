const DeptAdmin = require('./deptAdmin.model');
const _ = require('underscore');

// CREATE
exports.createDeptAdmin = (deptAdmin) =>
  DeptAdmin.create(deptAdmin);

// GET
exports.getDeptAdminByID = (_id) =>
  DeptAdmin.findOne({ _id });

exports.getDeptAdmins = (query) =>
  DeptAdmin.find(query);


// UPDATE
exports.updateDeptAdminByID = (_id, body) =>
  DeptAdmin.findOneAndUpdate({ _id }, body, { new: true });

exports.updateDeptAdmins = (query, body) =>
  DeptAdmin.updateMany(query, body);

// DELETE
exports.deleteDeptAdminByID = _id => {
  if (!_id) return null;
  return DeptAdmin.findOneAndRemove({ _id });
}

exports.deleteDeptAdmins = query => {
  if (_.isEmpty(query)) return null;
  return DeptAdmin.remove(query);
}
