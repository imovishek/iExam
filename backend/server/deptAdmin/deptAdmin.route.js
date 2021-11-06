const express = require("express");
const router = express.Router();
const secureApiCall = require("../middlewares/secureApiCall");
const deptAdminController = require("./deptAdmin.controller");
const { SUPERADMIN, DEPTADMIN } = require("../constants");

router
  .route("/deptAdmins")
  .get(
    secureApiCall([SUPERADMIN, DEPTADMIN]),
    deptAdminController.getDeptAdmins
  )
  .post(
    secureApiCall([SUPERADMIN, DEPTADMIN]),
    deptAdminController.createDeptAdmin
  )
  .put(secureApiCall([SUPERADMIN]), deptAdminController.updateDeptAdmins)
  .delete(secureApiCall([SUPERADMIN]), deptAdminController.deleteDeptAdmins);

router
  .route("/deptAdmin/:id")
  .get(secureApiCall([SUPERADMIN]), deptAdminController.getDeptAdminByID)
  .put(
    secureApiCall([SUPERADMIN, DEPTADMIN]),
    deptAdminController.updateDeptAdminByID
  )
  .delete(
    secureApiCall([SUPERADMIN, DEPTADMIN]),
    deptAdminController.deleteDeptAdminByID
  );

module.exports = router;
