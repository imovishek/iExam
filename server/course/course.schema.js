const mongoose = require('mongoose');

const { Schema } = mongoose;
const departmentSchema = require('../department/department.schema');
const teacherSchema = require('../teacher/teacher.schema');
const studentSchema = require('../student/student.schema');
const examSchema = require('../exam/exam.schema');
const mongooseLeanGetters = require('mongoose-lean-getters');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults');
const { allBatches, allStatuses } = require('../constants');

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  courseCode: {
    type: String,
    required: true,
    trim: true,
  },
  department: { type: departmentSchema, required: true },
  exams: [{ type: Schema.Types.ObjectId, ref: 'Exam'}],
  enrolledStudents: [{ type: Schema.Types.ObjectId, ref: 'Student'}],
  pendingEnrollStudents: [{ type: Schema.Types.ObjectId, ref: 'Student'}],
  assignedTeacher: { type: Schema.Types.ObjectId, ref: 'Teacher'},
  startDate: { type: Date },
  batchCode: {
    type: String,
    enum: {
      values: Object.keys(allBatches),
      message: 'Invalid batch'
    }
  },
  status: {
    type: String,
    enum: {
      values: Object.keys(allStatuses),
      message: 'Invalid Status'
    },
    required: true,
  },
  announcements: [String],
},
{
  timestamps: true,
  toObject: { getters: true, virtuals: true },
  toJSON: { getters: true, virtuals: true },
  strict: true
});

// courseSchema.plugin(mongooseLeanGetters);
// courseSchema.plugin(mongooseLeanVirtuals);
// courseSchema.plugin(mongooseLeanDefaults);

// courseSchema.virtual('exams', {
//   ref: 'Exam',
//   localField: 'examIDs',
//   foreignField: '_id',
//   justOne: false,
//   id: false,
// });

// courseSchema.virtual('enrolledStudents', {
//   ref: 'Student',
//   localField: 'enrolledStudentIDs',
//   foreignField: '_id',
//   justOne: false
// });

// courseSchema.virtual('pendingEnrollStudents', {
//   ref: 'Student',
//   localField: 'pendingEnrollStudentIDs',
//   foreignField: '_id',
//   justOne: false
// });


module.exports = courseSchema;
