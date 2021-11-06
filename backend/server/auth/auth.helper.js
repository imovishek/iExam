const credentialHelper = require('../credential/credential.helper');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { userTypeToModelMapping } = require('../../config/const');
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
    console.log('credential', credential);
    if (!credential) return { error: true, message: 'Invalid email/password' };
    if (credential) {
      const isValid = await bcryptjs.compare(String(password), credential.password);
      if (!isValid) {
          return { error: true, message: 'Invalid email/password' };
      }
      const { userType } = credential;
      const Model = userTypeToModelMapping[userType];
      const user = await Model.findOne({ 'credential.email': email }).lean();
      const token = jwt.sign({
          ...user
        },
        process.env.JWT_SECRET
      );
      return { token, user };
    }

};
