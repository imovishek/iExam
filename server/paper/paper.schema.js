const mongoose = require('mongoose');

const { Schema } = mongoose;

const paperSchema = new Schema({
	student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
	answers: [{
		questionID: { type: Schema.Types.ObjectId, required: true }, // Do not populate this
		answer: String,
		marks: Number,
	}],
	examID: { type: Schema.Types.ObjectId, ref: 'Exam', required: true },
	totalMarks: Number,
},
{
	timestamps: true,
	toObject: { getters: true, virtuals: true },
	toJSON: { getters: true, virtuals: true },
	strict: true
});

module.exports = paperSchema;