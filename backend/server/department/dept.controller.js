const deptHelper = require('./dept.helper');
const { httpStatuses, DEPT } = require('../constants');
const responseHandler = require('../middlewares/responseHandler');

// GET DEPT

exports.getDepts = async (req, res) => {
  const { query } = req;
  try {
    const result = await deptHelper.getDepts(query);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.getDeptByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deptHelper.getDeptByID(id);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

// CREATE DEPT
exports.createDept = async (req, res) => {
  const { dept } = req.body;
  try {
    const result = await deptHelper.createDept(dept);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

// UPDATE DEPT
exports.updateDepts = async (req, res) => {
  const { query, body } = req;
  try {
    const result = await deptHelper.updateDepts(query, body);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.updateDeptByID = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const result = await deptHelper.updateDeptByID(id, body.update);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};


// DELETE DEPT
exports.deleteDepts = async (req, res) => {
  const { query } = req;
  try {
    const result = await deptHelper.deleteDepts(query);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.deleteDeptByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deptHelper.deleteDeptByID(id);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};
