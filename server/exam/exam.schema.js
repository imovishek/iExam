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
	resultPublished: { type: Boolean, default: false },
	announcements: [{
		dateTime: { type: Date, default: Date.now() },
		body: { type: String, required: true },
		securityType: {
			type: String,
			enum: {
				values: ['public', 'private']
			},
			required: true,
			default: 'public' },
		access: { type: [Schema.Types.ObjectId], default: [] },
		authorID: Schema.Types.ObjectId,
		seen: [Schema.Types.ObjectId]
	}],
	resultPublishedDate: Date,
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
