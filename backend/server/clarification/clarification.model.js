const mongoose = require('mongoose');
const clarificationSchema = require('./clarification.schema');
module.exports = mongoose.model("Clarification", clarificationSchema);