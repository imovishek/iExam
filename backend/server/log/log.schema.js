const mongoose = require("mongoose");

const { Schema } = mongoose;

const logEntrySchema = new Schema(
  {
    desc: {
      type: String,
      trim: true,
    },
    data: Object,
  },

  {
    timestamps: true,
    toObject: { getters: true, virtuals: true },
    toJSON: { getters: true, virtuals: true },
    strict: true,
  }
);
const logSchema = new Schema({
  JWTToken: {
    type: String,
    trim: true,
  },
  studentMail: {
    type: String,
    trim: true,
    required: true,
  },
  logs: [logEntrySchema],
});

module.exports = logSchema;
