const Log = require("./log.model");
const _ = require("underscore");
const moment = require("moment");

exports.createLog = (email, token) => {
  Log.create({ studentMail: email, JWTToken: token, logs: [] });
};
