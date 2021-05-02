const mongoose = require('mongoose');
const uniqid = require('uniqid');

const { Schema } = mongoose;

const departmentSchema = new Schema({
    departmentID: {
        type: String,
        default: uniqid('dept'),
        required: true,
        unique: true,
    },
    departmentCode: {
        type: String,
        required: true
    },
    departmentName: {
        type: String,
        required: true
    }
},
{
  timestamps: true,
  toObject: { getters: true, virtuals: true },
  toJSON: { getters: true, virtuals: true },
  strict: true
});

// departmentSchema.index({ departmentCode: 1 }, { unique: true });

module.exports = departmentSchema;