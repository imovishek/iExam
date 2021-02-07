const { httpStatuses } = require('../constants');
const _ = require('underscore');
const { parseQuery } = require('../common.functions');
const { userTypeToHelperMapping } = require('../../config/const');

const firstUpperCase = userType => userType.replace(/\b\w/g, c => c.toUpperCase());
// GET USER
exports.getUsers = async (req, res) => {
  const { userType = 'deptAdmin' } = req.user;
  const userHelper = userTypeToHelperMapping[userType];
  const UserType = firstUpperCase(userType);
  const { query } = req;
  try {
    const result = await userHelper[`get${UserType}s`](query);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
      .status(httpStatuses.INTERNAL_SERVER_ERROR)
      .send({ error: true, message: err.message });
  }
};

exports.getUserByID = async (req, res) => {
  const { userType = 'deptAdmin' } = req.user;
  const userHelper = userTypeToHelperMapping[userType];
  const UserType = firstUpperCase(userType);
  const { id } = req.params;
  try {
    const result = await userHelper[`get${UserType}ByID`](id);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
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
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
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
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
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
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
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
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};

exports.deleteUserByID = async (req, res) => {
  const { userType = 'deptAdmin' } = req.user;
  const userHelper = userTypeToHelperMapping[userType];
  const UserType = firstUpperCase(userType);
  const { id } = req.params;
  try {
    const result = await userHelper[`delete${UserType}ByID`](id);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};
