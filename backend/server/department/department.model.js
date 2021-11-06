const mongoose = require('mongoose');
const departmentSchema = require('./department.schema');
module.exports = mongoose.model("Department", departmentSchema);