const mongoose = require('mongoose');
const paperSchema = require('./paper.schema');
module.exports = mongoose.model("Paper", paperSchema);