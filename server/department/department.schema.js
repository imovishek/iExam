const mongoose = require('mongoose');

const { Schema } = mongoose;

const departmentSchema = new Schema({
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