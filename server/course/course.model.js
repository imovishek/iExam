const mongoose = require('mongoose');
const courseSchema = require('./course.schema');
module.exports = mongoose.model("Course", courseSchema);