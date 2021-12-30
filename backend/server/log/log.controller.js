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
exports.recordVisibilityChange = async (req, res) => {
  const { email, data } = req.body;
  const { browser, version, os, platform } = req.useragent;
  const payload = {
    desc: "visibility",
    data: data,
  };

  await logModel.findOneAndUpdate(
    { studentMail: email },
    {
      $push: { logs: payload },
    }
  );

  responseHandler(res, httpStatuses.OK, {});
};

exports.getLogs = async (req, res) => {
  const { email, startTime, endTime } = req.body;

  console.log(email, startTime, endTime);

  const data = await logModel.aggregate([
    {
      $match: {
        studentMail: email,
      },
    },
    { $unwind: "$logs" },
    {
      $match: {
        "logs.createdAt": {
          $gte: new Date(startTime),
          $lt: new Date(endTime),
        },
      },
    },
    {
      $project: {
        desc: "$logs.desc",
        data: "$logs.data",
        time: "$logs.createdAt",
      },
    },
  ]);

  responseHandler(res, httpStatuses.OK, data);
};
