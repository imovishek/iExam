const { httpStatuses } = require("../constants");
const responseHandler = require("../middlewares/responseHandler");
const logModel = require("./log.model");

exports.recordLogin = async (req, res) => {
  const { email, ip } = req.body;
  const { browser, version, os, platform } = req.useragent;
  const payload = {
    desc: "login",
    data: {
      ip: ip,
      device: {
        browser: browser,
        browserVersion: version,
        os: os,
        platform: platform,
      },
    },
  };

  await logModel.findOneAndUpdate(
    { studentMail: email },
    {
      $push: { logs: payload },
    }
  );

  responseHandler(res, httpStatuses.OK, {});
};
