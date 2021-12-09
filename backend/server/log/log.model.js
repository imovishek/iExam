const mongoose = require("mongoose");
const logSchema = require("./log.schema");
module.exports = mongoose.model("Log", logSchema);
