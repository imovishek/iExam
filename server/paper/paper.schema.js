const mongoose = require('mongoose');

const studentSchema = require('../student/student.schema');
const questionSchema = require('../question/question.schema');
const departmentSchema = require('../department/department.schema');

const { Schema } = mongoose;

const paperSchema = new Schema({
	student: { type: Schema.Types.ObjectId, ref: 'Student' },
	answers: [{
		question: { type: Schema.Types.ObjectId, ref: 'Question' },
		answer: String,
	}]
},
{
	timestamps: true,
	toObject: { getters: true, virtuals: true },
	toJSON: { getters: true, virtuals: true },
	strict: true
});

module.exports = paperSchema;