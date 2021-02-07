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
	course: { type: Schema.Types.ObjectId, ref: 'Course' },
	questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
	participants: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
	bannedParticipants: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
	papers: [{
		student: { type: Schema.Types.ObjectId, ref: 'Student' },
		answers: [{
			question: Schema.Types.ObjectId,
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