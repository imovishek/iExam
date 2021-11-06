const mongoose = require('mongoose');
const questionSchema = require('./question.schema');
module.exports = mongoose.model("Question", questionSchema);