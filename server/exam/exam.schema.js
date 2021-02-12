const mongoose = require('mongoose');

const departmentSchema = require('../department/department.schema');

const { Schema } = mongoose;

const examSchema = new Schema({
	title: { type: String, required: true },
	startDate: { type: Date, required: true },
	startTime: { type: String, required: true },
	duration: { type: String, required: true },
	department: {
		type: departmentSchema,
		required: true
	},
	course: { type: Schema.Types.ObjectId, ref: 'Course' },
	questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
	bannedParticipants: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
	papers: [{ type: Schema.Types.ObjectId, ref: 'Paper' }],
	totalMarks: Number
},
{
	timestamps: true,
	toObject: { getters: true, virtuals: true },
	toJSON: { getters: true, virtuals: true },
	strict: true
});

// Virtual fields
// participants === course.enrolledStudents

module.exports = examSchema;
