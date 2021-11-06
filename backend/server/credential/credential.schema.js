const mongoose = require('mongoose');

const { Schema } = mongoose;

const credentialSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true }
},
{
  timestamps: true,
  toObject: { getters: true, virtuals: true },
  toJSON: { getters: true, virtuals: true },
  strict: true
});


// credentialSchema.index({ email: 1 }, { unique: true });

module.exports = credentialSchema;
