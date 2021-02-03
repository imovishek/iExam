const mongoose = require('mongoose');
const examSchema = require('./exam.schema');
module.exports = mongoose.model("Exam", examSchema);