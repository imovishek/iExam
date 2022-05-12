const config = require("../../config/config");
const jwt = require("jsonwebtoken");
const { STUDENT } = require("../constants");
const logModel = require("../log/log.model");
const authURL = "/api/auth/login";
const forgotPassUrl = "/api/user/forgotPassword";

module.exports = (req, res, next) => {
  if (req.url === authURL) return next();
  if (req.url === forgotPassUrl) return next();
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, config.jwtSecret, async (err, user) => {
    if (err) {
      console.log(err.message);
      return res.sendStatus(403);
    }
    //if the user is student then verify the last generated random JWT token matches with
    //this JWT
    if (user.userType === STUDENT) {
      const result = await logModel
        .findOne({ studentMail: user.credential.email })
        .lean();

      console.log("redirects");
      if (!result || !user.JWTToken || result.JWTToken !== user.JWTToken) {
        res.sendStatus(403);
        return;
      }
    }

    req.user = user;
    next();
  });
};
