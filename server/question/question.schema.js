const mongoose = require('mongoose');

const { Schema } = mongoose;
const departmentSchema = require('../department/department.schema');

const questionSchema = new Schema({
    authorID: { type: Schema.Types.ObjectId, required: true },
    type: {
        type: String, // MCQM, MCQS, BROAD, PROGQUE
        required: true
    },
    options: [String],
    answer: [String],
    body: String,
    securityType: { type: String, required: true },
    teacherAccess: [Schema.Types.ObjectId],
    department: {
        type: departmentSchema,
        required: true
    },
},
{
  timestamps: true,
  toObject: { getters: true, virtuals: true },
  toJSON: { getters: true, virtuals: true },
  strict: true
});

module.exports = questionSchema;