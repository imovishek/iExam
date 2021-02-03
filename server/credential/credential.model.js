const mongoose = require('mongoose');
const credentialSchema = require('./credential.schema');
module.exports = mongoose.model("Credential", credentialSchema);