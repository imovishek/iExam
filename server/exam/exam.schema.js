const mongoose = require('mongoose');

const studentSchema = require('../student/student.schema');
const questionSchema = require('../question/question.schema');
const departmentSchema = require('../department/department.schema');

const { Schema } = mongoose;

const examSchema = new Schema({
    title: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, required: true },
    department: {
        type: departmentSchema,
        required: true
    },
    questions: [questionSchema],
    participants: [{
        student: { type: studentSchema, required: true },
        answers: [{
            question: { type: questionSchema, required: true },
            answer: [String]
        }]
    }],
    bannedParticipants: [{
        student: { type: studentSchema, required: true },
        comment: String,
        answers: [{
            question: { type: questionSchema, required: true },
            answer: [String]
        }]
    }],
    totalMarks: Number
},
{
  timestamps: true,
  toObject: { getters: true, virtuals: true },
  toJSON: { getters: true, virtuals: true },
  strict: true
});

module.exports = examSchema;