const express = require("express");
const secureApiCall = require("../middlewares/secureApiCall");
const router = express.Router();
const logController = require("./log.controller");
const { STUDENT } = require("../constants");
var useragent = require("express-useragent");

router.use(useragent.express());
router
  .route("/log/login")
  .post(secureApiCall([STUDENT]), logController.recordLogin);

module.exports = router;
