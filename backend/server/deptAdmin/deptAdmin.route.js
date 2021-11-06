const express = require('express');
const router = express.Router();
const secureApiCall = require('../middlewares/secureApiCall');
const deptAdminController = require('./deptAdmin.controller');

router
  .route('/deptAdmins')
  .get(
    secureApiCall([]),
    deptAdminController.getDeptAdmins
  ).post(
    secureApiCall([]),
    deptAdminController.createDeptAdmin
  ).put(
    secureApiCall([]),
    deptAdminController.updateDeptAdmins
  ).delete(
    secureApiCall([]),
    deptAdminController.deleteDeptAdmins
  );

router
  .route('/deptAdmin/:id')
  .get(
    secureApiCall([]),
    deptAdminController.getDeptAdminByID
  ).put(
    secureApiCall([]),
    deptAdminController.updateDeptAdminByID
  ).delete(
    secureApiCall([]),
    deptAdminController.deleteDeptAdminByID
  );


module.exports = router;
