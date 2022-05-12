const express = require("express");
const secureApiCall = require("../middlewares/secureApiCall");
const router = express.Router();
const logController = require("./log.controller");
const { STUDENT, TEACHER, DEPTADMIN } = require("../constants");
var useragent = require("express-useragent");

router.use(useragent.express());
router
  .route("/log/login")
  .post(secureApiCall([STUDENT]), logController.recordLogin);
router
  .route("/log/visibility")
  .post(secureApiCall([STUDENT]), logController.recordVisibilityChange);

router
  .route("/log/getLogs")
  .post(secureApiCall([TEACHER, DEPTADMIN]), logController.getLogs);
router
  .route("/log/getLogCounts")
  .post(secureApiCall([TEACHER, DEPTADMIN]), logController.countLogs);

module.exports = router;
