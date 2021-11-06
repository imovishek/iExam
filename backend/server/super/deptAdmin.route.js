const express = require('express');
const router = express.Router();
const expressJWT = require('express-jwt');

const config = require('../../config/config');
const deptAdminController = require('./deptAdmin.controller');

router
  .route('/superUser')
  .get(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    deptAdminController.getDeptAdmins
  ).post(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    deptAdminController.createDeptAdmin
  ).put(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    deptAdminController.updateDeptAdmins
  ).delete(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    deptAdminController.deleteDeptAdmins
  );

router
  .route('/superUser/:id')
  .get(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    deptAdminController.getDeptAdminByID
  ).put(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    deptAdminController.updateDeptAdminByID
  ).delete(
    expressJWT({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    deptAdminController.deleteDeptAdminByID
  );


module.exports = router;
