const mongoose = require('mongoose');

const { Schema } = mongoose;
const departmentSchema = require('../department/department.schema');
const credentialSchema = require('../credential/credential.schema');
const courseSchema = require('../course/course.schema');
const teacherSchema = require('../teacher/teacher.schema');

const deptAdminSchema = new Schema({
  firstName: String,
  lastName: String,
  userType: { type: String, default: 'superUser' },
  credential: { type: credentialSchema, required: true },
},
{
  timestamps: true,
  toObject: { getters: true, virtuals: true },
  toJSON: { getters: true, virtuals: true },
  strict: true
});

module.exports = deptAdminSchema;