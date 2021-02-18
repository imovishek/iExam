const DeptAdmin = require('./deptAdmin.model');
const Credential = require('../credential/credential.model');
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
exports.updateDeptAdminByID = async (_id, body) => {
  if (body.credential) {
    const prevDeptAdmin = await DeptAdmin.findOne({ _id });
    const update = {};
    const { email, password } = body.credential;
    if (email) update.email = email;
    if (password) update.password = password;

    await Credential.findOneAndUpdate({ email: prevDeptAdmin.credential.email }, update);
  }
  return DeptAdmin.findOneAndUpdate({ _id }, body, { new: true });
}
exports.updateDeptAdmins = (query, body) =>
  DeptAdmin.updateMany(query, body, { new: true });

// DELETE
exports.deleteDeptAdminByID = _id => {
  if (!_id) return null;
  return DeptAdmin.findOneAndRemove({ _id });
}

exports.deleteDeptAdmins = query => {
  if (_.isEmpty(query)) return null;
  return DeptAdmin.remove(query);
}
