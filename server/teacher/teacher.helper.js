const Teacher = require('./teacher.model');
const Credential = require('../credential/credential.model');
const _ = require('underscore');
const bcrypt = require('bcryptjs');


// CREATE
exports.createTeacher = async (teacher) => {
  const { credential } = teacher;
  const salt = await bcrypt.genSalt(10);
  credential.password = await bcrypt.hash(credential.password, salt);
  const cred = await Credential.create(credential);
  teacher.credential = cred;
  return Teacher.create(teacher);
}

// GET
exports.getTeacherByID = (_id) =>
  Teacher.findOne({ _id });

exports.getTeachers = (query, sort = { createdAt: -1 }) =>
  Teacher.find(query).sort(sort);


// UPDATE
exports.updateTeacherByID = async (_id, body) => {
  if (body.credential) {
    const prevTeacher = await Teacher.findOne({ _id });
    const update = {};
    const { email, password } = body.credential;
    if (email) update.email = email;
    if (password) update.password = password;

    await Credential.findOneAndUpdate({ email: prevTeacher.credential.email }, update);
  }
  return Teacher.findOneAndUpdate({ _id }, body, { new: true });
}

exports.updateTeachers = (query, body) =>
  Teacher.updateMany(query, body, { new: true });

// DELETE
exports.deleteTeacherByID = async _id => {
  if (!_id) return null;
  const teacher = await Teacher.findOne({ _id });
  if (teacher && teacher.credential.email) {
    await Credential.findOneAndRemove({ email: teacher.credential.email });
  }
  return Teacher.findOneAndRemove({ _id });
}

exports.deleteTeachers = query => {
  if (_.isEmpty(query)) return null;
  return Teacher.remove(query);
}

exports.createOrUpdateTeacher = (teachers = [], user) => {
  return Promise.all(teachers.map(async teacher => {
    const oldTeacherCount = await Teacher.find({
      'credential.email': teacher.credential.email
    }).countDocuments();
    if (oldTeacherCount) return null;
    await Credential.create(teacher.credential);
    return new Teacher(teacher).save();
  }));
}
