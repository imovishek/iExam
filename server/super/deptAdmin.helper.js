const SuperUser = require('./deptAdmin.model');
const Credential = require('../credential/credential.model');
const _ = require('underscore');
const bcrypt = require('bcryptjs');
// CREATE
exports.createSuperUser = async (superUser) =>
  { const { credential } = superUser;
    const salt = await bcrypt.genSalt(10);
    credential.password = await bcrypt.hash(credential.password, salt);
    const cred = await Credential.create(credential);
    superUser.credential = cred;
    return SuperUser.create(superUser);
}

// GET
exports.getSuperUserByID = (_id) =>
  SuperUser.findOne({ _id });

exports.getSuperUsers = (query) =>
  SuperUser.find();


// UPDATE
exports.updateSuperUserByID = async (_id, body) => {
  if (body.credential) {
    const prevSuperUser = await SuperUser.findOne({ _id });
    const update = {};
    const { email, password } = body.credential;
    if (email) update.email = email;
    if (password) update.password = password;

    await Credential.findOneAndUpdate({ email: prevSuperUser.credential.email }, update);
  }
  return SuperUser.findOneAndUpdate({ _id }, body, { new: true });
}
exports.updateSuperUsers = (query, body) =>
  SuperUser.updateMany(query, body, { new: true });

// DELETE
exports.deleteSuperUserByID =async  _id => {
  if (!_id) return null;
  const admin = await SuperUser.findOne({ _id });
  if (admin && admin.credential.email) {
    await Credential.findOneAndRemove({ email: admin.credential.email });
  }
  return SuperUser.findOneAndRemove({ _id });
}

exports.deleteSuperUsers = query => {
  if (_.isEmpty(query)) return null;
  return SuperUser.remove(query);
}
