const Dept = require('./department.model');
const _ = require('underscore');
const bcrypt = require('bcryptjs');
// CREATE
exports.createDept = async (dept) => {
  return Dept.create(dept);
}
// GET
exports.getDeptByID = (_id) =>
  Dept.findOne({ _id });

exports.getDepts = (query) =>
  Dept.find({});


// UPDATE
exports.updateDeptByID = async (_id, body) => {
  return Dept.findOneAndUpdate({ _id }, body, { new: true });
}
exports.updateDepts = (query, body) =>
  Dept.updateMany(query, body, { new: true });

// DELETE
exports.deleteDeptByID = async _id => {
  if (!_id) return null;
  const dept = await Dept.findOne({ _id });
  return Dept.findOneAndRemove({ _id });
}

exports.deleteDepts = query => {
  if (_.isEmpty(query)) return null;
  return Dept.remove(query);
}
exports.createOrUpdateDept = (depts = [], user) => {
  return Promise.all(depts.map(async dept=> {
    const oldDeptCount = await Dept.find({
      'credential.email': dept.email
    }).countDocuments();
    if (oldDeptCount) return null;
    return new Dept(dept).save();
  }));
}

