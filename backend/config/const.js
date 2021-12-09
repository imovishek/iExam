const DeptAdmin = require('../server/deptAdmin/deptAdmin.model');
const Teacher = require('../server/teacher/teacher.model');
const Student = require('../server/student/student.model');
const SuperUser = require('../server/super/deptAdmin.model');

const deptAdminHelper = require('../server/deptAdmin/deptAdmin.helper');
const teacherHelper = require('../server/teacher/teacher.helper');
const studentHelper = require('../server/student/student.helper');
const superUserHelper = require('../server/super/deptAdmin.helper');
exports.userTypeToModelMapping = {
  deptAdmin: DeptAdmin,
  teacher: Teacher,
  student: Student,
  superUser:SuperUser
};

exports.userTypeToHelperMapping = {
  deptAdmin: deptAdminHelper,
  teacher: teacherHelper,
  student: studentHelper,
  superUser: superUserHelper,
};

exports.JWTToken="JWTToken";