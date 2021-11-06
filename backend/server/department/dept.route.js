const express = require('express');
const router = express.Router();
const secureApiCall = require('../middlewares/secureApiCall');
const deptController = require('./dept.controller');
const { SUPERADMIN,DEPTADMIN } = require('../constants');

router
  .route('/depts')
  .get(
    secureApiCall([SUPERADMIN,DEPTADMIN]),
    deptController.getDepts
  ).post(
    secureApiCall([SUPERADMIN,DEPTADMIN]),
    deptController.createDept
  ).put(
    secureApiCall([SUPERADMIN]),
    deptController.updateDepts
  ).delete(
    secureApiCall([SUPERADMIN]),
    deptController.deleteDepts
  );

router
  .route('/dept/:id')
  .get(
    secureApiCall([SUPERADMIN]),
    deptController.getDeptByID
  ).put(
    secureApiCall([SUPERADMIN,DEPTADMIN]),
    deptController.updateDeptByID
  ).delete(
    secureApiCall([SUPERADMIN,DEPTADMIN]),
    deptController.deleteDeptByID
  );


module.exports = router;
