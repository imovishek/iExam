const DeptAdmin = require('./deptAdmin.model');
const Credential = require('../credential/credential.model');
const _ = require('underscore');
const bcrypt = require('bcryptjs');
const emailHelper = require('../email/email.helper');
// CREATE
exports.createDeptAdmin = async (deptAdmin) => {
  const { credential } = deptAdmin;
  const salt = await bcrypt.genSalt(10);
  credential.password = await bcrypt.hash(credential.password, salt);
  const cred = await Credential.create(credential);
  deptAdmin.credential = cred;
  return DeptAdmin.create(deptAdmin);
}
// GET
exports.getDeptAdminByID = (_id) =>
  DeptAdmin.findOne({ _id });

exports.getDeptAdmins = (query) =>
  DeptAdmin.find({});


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
exports.deleteDeptAdminByID = async _id => {
  if (!_id) return null;
  const deptAdmin = await DeptAdmin.findOne({ _id });
  if (deptAdmin && deptAdmin.credential.email) {
    await Credential.findOneAndRemove({ email: deptAdmin.credential.email });
  }
  return DeptAdmin.findOneAndRemove({ _id });
}

exports.deleteDeptAdmins = query => {
  if (_.isEmpty(query)) return null;
  return DeptAdmin.remove(query);
}
exports.createOrUpdateAdmin = (admins = [], user) => {
  return Promise.all(admins.map(async admin => {
    const oldAdminCount = await DeptAdmin.find({
      'credential.email': admin.credential.email
    }).countDocuments();
    if (oldAdminCount) return null;
    await Credential.create(admin.credential);
    const emailBody = emailHelper.generateRegisterEmailBody(admin.firstName, admin.plainPassword);
    await emailHelper.sendMail(admin.credential.email, 'Registration Successful', emailBody);
    return new DeptAdmin(admin).save();
  }));
}

