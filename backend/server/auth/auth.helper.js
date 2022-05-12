const credentialHelper = require("../credential/credential.helper");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { userTypeToModelMapping, JWTToken } = require("../../config/const");
const { STUDENT } = require("../constants");
const Log = require("../log/log.model");
const { createLog } = require("../log/log.helper");
const shortid = require("shortid");
/**
 * This function matches email and password with credential collection if it find
 * a match it returns with jwt token and user object of corresponding user type
 *
 * @param {string} email email of the user
 * @param {string} password password of the user
 * @returns {object} with token and user
 */

exports.login = async (email, password) => {
  const credential = await credentialHelper.getCredential({ email });
  console.log("credential", credential);
  if (!credential) return { error: true, message: "Invalid email/password" };
  if (credential) {
    const isValid = await bcryptjs.compare(
      String(password),
      credential.password
    );
    if (!isValid) {
      return { error: true, message: "Invalid email/password" };
    }
    const { userType } = credential;
    const Model = userTypeToModelMapping[userType];
    const user = await Model.findOne({ "credential.email": email }).lean();

    const JWTPayload = { ...user };

    // add a random string to jwt  payload everytime a student logs in
    // we will use this random string whether the student is logging in from
    // another device or not
    if (userType === STUDENT) {
      const sLog = await Log.findOne({ studentMail: user.credential.email });

      const jwtToken = shortid.generate();
      JWTPayload[JWTToken] = jwtToken;

      if (sLog === null) {
        createLog(user.credential.email, jwtToken);
      } else {
        await Log.findOneAndUpdate(
          { studentMail: user.credential.email },
          { JWTToken: jwtToken }
        );
      }
    }

    const token = jwt.sign(JWTPayload, process.env.JWT_SECRET);
    return { token, user };
  }
};
