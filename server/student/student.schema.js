const mongoose = require('mongoose');
const departmentSchema = require('../department/department.schema');
const credentialSchema = require('../credential/credential.schema');

const { Schema } = mongoose;

const studentSchema = new Schema({
    firstName: String,
    lastName: String,
    registrationNo: {
        type: String,
        required: true
    },
    phoneNuber: String,
    userType: { type: String, default: 'student' },
    department: {
        type: departmentSchema,
        required: true
    },
    credential: { type: credentialSchema, required: true },
    ipAddress: String,
    macAddress: String
},
{
  timestamps: true,
  toObject: { getters: true, virtuals: true },
  toJSON: { getters: true, virtuals: true },
  strict: true
});


module.exports = studentSchema;
