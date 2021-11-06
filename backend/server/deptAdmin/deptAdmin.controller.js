const deptAdminHelper = require('./deptAdmin.helper');
const { httpStatuses } = require('../constants');
const responseHandler = require('../middlewares/responseHandler');

// GET DEPTADMIN

exports.getDeptAdmins = async (req, res) => {
  const { query } = req;
  try {
    const result = await deptAdminHelper.getDeptAdmins(query);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.getDeptAdminByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deptAdminHelper.getDeptAdminByID(id);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

// CREATE DEPTADMIN
exports.createDeptAdmin = async (req, res) => {
  const { deptAdmin } = req.body;
  try {
    const result = await deptAdminHelper.createDeptAdmin(deptAdmin);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

// UPDATE DEPTADMIN
exports.updateDeptAdmins = async (req, res) => {
  const { query, body } = req;
  try {
    const result = await deptAdminHelper.updateDeptAdmins(query, body);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.updateDeptAdminByID = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const result = await deptAdminHelper.updateDeptAdminByID(id, body.update);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};


// DELETE DEPTADMIN
exports.deleteDeptAdmins = async (req, res) => {
  const { query } = req;
  try {
    const result = await deptAdminHelper.deleteDeptAdmins(query);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.deleteDeptAdminByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deptAdminHelper.deleteDeptAdminByID(id);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};
