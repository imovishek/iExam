const { httpStatuses, DEPTADMIN } = require('../constants');
const _ = require('underscore');
const { parseQuery } = require('../common.functions');
const { userTypeToHelperMapping } = require('../../config/const');
const bcrypt = require('bcryptjs');
const responseHandler = require('../middlewares/responseHandler');
const firstUpperCase = userType => userType.replace(/\b\w/g, c => c.toUpperCase());
// GET USER
exports.getUsers = async (req, res) => {
  const { userType = 'deptAdmin' } = req.query;
  const userHelper = userTypeToHelperMapping[userType];
  const UserType = firstUpperCase(userType);
  const { query } = req;
  try {
    const result = await userHelper[`get${UserType}s`](query);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.getUserByID = async (req, res) => {
  const { userType = 'deptAdmin' } = req.user;
  const userHelper = userTypeToHelperMapping[userType];
  const UserType = firstUpperCase(userType);
  const { id } = req.params;
  try {
    const result = await userHelper[`get${UserType}ByID`](id);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

// CREATE USER
exports.createUser = async (req, res) => {
  const { userType = 'deptAdmin' } = req.user;
  const userHelper = userTypeToHelperMapping[userType];
  const UserType = firstUpperCase(userType);
  const { user } = req.body;
  try {
    const result = await userHelper[`create${UserType}`](user);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

// UPDATE USER
exports.updateUsers = async (req, res) => {
  const { userType = 'deptAdmin' } = req.user;
  const userHelper = userTypeToHelperMapping[userType];
  const UserType = firstUpperCase(userType);
  const { query, body } = req;
  const { _id } = query;
  if (_id) query._id = parseQuery(_id);

  try {
    const result = await userHelper[`update${UserType}s`](query, body);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.updateUserByID = async (req, res) => {
  const { userType = 'deptAdmin' } = req.user;
  const userHelper = userTypeToHelperMapping[userType];
  const UserType = firstUpperCase(userType);
  const { id } = req.params;
  const { body } = req;
  try {
    const result = await userHelper[`update${UserType}ByID`](id, body.update);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};


// DELETE USER
exports.deleteUsers = async (req, res) => {
  const { userType = 'deptAdmin' } = req.user;
  const userHelper = userTypeToHelperMapping[userType];
  const UserType = firstUpperCase(userType);
  const { query } = req;
  try {
    const result = await userHelper[`delete${UserType}s`](query);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.deleteUserByID = async (req, res) => {
  const { userType = 'deptAdmin' } = req.user;
  const userHelper = userTypeToHelperMapping[userType];
  const UserType = firstUpperCase(userType);
  const { id } = req.params;
  try {
    const result = await userHelper[`delete${UserType}ByID`](id);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { user, password } = req.body;
  const { userType = 'deptAdmin' } = user;
  const userHelper = userTypeToHelperMapping[userType];
  const UserType = firstUpperCase(userType);
  const { id } = req.params;
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(String(password), salt);
    if (req.user.userType !== DEPTADMIN) throw new Error('You do not have access to reset password');
    const body = {
      credential: {
        ...user.credential,
        password: passwordHash,
      }
    };
    const result = await userHelper[`update${UserType}ByID`](user._id, body);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.getUserMe = async (req, res) => {
  const { userType = 'deptAdmin', _id } = req.user;
  const userHelper = userTypeToHelperMapping[userType];
  const UserType = firstUpperCase(userType);
  try {
    const result = await userHelper[`get${UserType}ByID`](_id);
    responseHandler(res, httpStatuses.OK, { payload: result }, { credential: true });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
}

exports.updateUserMe = async (req, res) => {
  const { userType = 'deptAdmin', _id } = req.user;
  const userHelper = userTypeToHelperMapping[userType];
  const UserType = firstUpperCase(userType);
  const { body } = req;
  try {
    const result = await userHelper[`update${UserType}ByID`](_id, body.update);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
}