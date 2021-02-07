const mongoose = require('mongoose');

const departmentSchema = require('../department/department.schema');
const questionSchema = require('../question/question.schema');
const credentialSchema = require('../credential/credential.schema');

const { Schema } = mongoose;

const teacherSchema =new Schema({
    firstName: String,
    lastName: String,
    shortName: String,
    userType: { type: String, default: 'teacher' },
    department: {
        type: departmentSchema,
        required: true
    },
    credential: { type: credentialSchema, required: true },
    questions: [questionSchema],
    userAccess: [String]
},
{
  timestamps: true,
  toObject: { getters: true, virtuals: true },
  toJSON: { getters: true, virtuals: true },
  strict: true
});

module.exports = teacherSchema;
