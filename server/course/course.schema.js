const mongoose = require('mongoose');

const { Schema } = mongoose;
const departmentSchema = require('../department/department.schema');
const teacherSchema = require('../teacher/teacher.schema');
const studentSchema = require('../student/student.schema');
const examSchema = require('../exam/exam.schema');

const courseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  courseCode: {
    type: String,
    required: true
  },
  department: { type: departmentSchema, required: true },
  exams: [examSchema],
  enrolledStudents: [studentSchema],
  pendingEnrollStudents: [studentSchema],
  assignedTeacher: teacherSchema,
  startDate: { type: Date },
  status: { type: String, required: true }
},
{
  timestamps: true,
  toObject: { getters: true, virtuals: true },
  toJSON: { getters: true, virtuals: true },
  strict: true
});

module.exports = courseSchema;
