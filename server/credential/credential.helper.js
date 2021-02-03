const Credential = require('./credential.model');
const _ = require('underscore');

// CREATE
exports.createCredential = (credential) =>
    Credential.create(credential);

// GET
exports.getCredential = (query) =>
    Credential.findOne(query);

exports.getCredentials = (query) =>
    Credential.find(query);


// UPDATE
exports.updateCredential = (query, body) =>
    Credential.findOneAndUpdate(query, body);

exports.updateCredentials = (query, body) =>
    Credential.updateMany(query, body);

// DELETE
exports.deleteCredential = query => {
    if (_.isEmpty(query)) return null;
    return Credential.findOneAndRemove(query);
}

exports.deleteCredentials = query => {
    if (_.isEmpty(query)) return null;
    return Credential.remove(query);
}
