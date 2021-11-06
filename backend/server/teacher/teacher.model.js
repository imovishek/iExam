const mongoose = require('mongoose');
const teacherSchema = require('./teacher.schema');
module.exports = mongoose.model("Teacher", teacherSchema);
