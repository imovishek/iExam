const mongoose = require('mongoose');
const deptAdminSchema = require('./deptAdmin.schema');
module.exports = mongoose.model("DeptAdmin", deptAdminSchema);