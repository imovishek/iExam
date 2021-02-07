const DeptAdmin = require('../server/deptAdmin/deptAdmin.model');
const Teacher = require('../server/teacher/teacher.model');
const Student = require('../server/student/student.model');

const deptAdminHelper = require('../server/deptAdmin/deptAdmin.helper');
const teacherHelper = require('../server/teacher/teacher.helper');
const studentHelper = require('../server/student/student.helper');
exports.userTypeToModelMapping = {
  deptAdmin: DeptAdmin,
  teacher: Teacher,
  student: Student,
};

exports.userTypeToHelperMapping = {
  deptAdmin: deptAdminHelper,
  teacher: teacherHelper,
  student: studentHelper,
};