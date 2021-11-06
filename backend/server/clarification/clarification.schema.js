const mongoose = require('mongoose');

const { Schema } = mongoose;

const clarificationSchema = new Schema({
	question: { type: String, trim: true, required: true },
	status: {
		type: String,
		default: "pending",
		enum: {
			values: [
				"pending",
				"ignored",
				"answered",
			]
		}
	},
	answer: {
		type: String,
		validate: {
			validator: function(v) {
				return v.length > 0;
			},
			message: props => `Answer should not be empty`
		},
	},
	examID: { type: String, required: true },
	userID: { type: String, required: true },
	questionID: { type: String },
	isPublic: {
		type: Boolean,
		default: false,
		required: true,
	},
	askTime: { type: Date, default: Date.now() },
	responseTime: { type: Date }
},
{
	timestamps: true,
	toObject: { getters: true, virtuals: true },
	toJSON: { getters: true, virtuals: true },
	strict: true
});

module.exports = clarificationSchema;