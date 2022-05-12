const express = require("express");
const router = express.Router();

const authRouter = require("./auth/auth.route");
const courseRouter = require("./course/course.route");
const teacherRouter = require("./teacher/teacher.route");
const studentRouter = require("./student/student.route");
const questionRouter = require("./question/question.route");
const examRouter = require("./exam/exam.route");
const paperRouter = require("./paper/paper.route");
const deptAdminRouter = require("./deptAdmin/deptAdmin.route");
const credentialRouter = require("./credential/credential.route");
const compilerRouter = require("./compiler/compiler.route");
const userRouter = require("./user/user.route");
const deptRouter = require("./department/dept.route");
const superUserRouter = require("./super/deptAdmin.route");
const clarificationRouter = require("./clarification/clarification.route");
const logRouter = require("./log/log.route");

router.use(authRouter);
router.use(courseRouter);
router.use(teacherRouter);
router.use(studentRouter);
router.use(questionRouter);
router.use(examRouter);
router.use(paperRouter);
router.use(deptAdminRouter);
router.use(credentialRouter);
router.use(compilerRouter);
router.use(userRouter);
router.use(clarificationRouter);
router.use(deptRouter);
router.use(superUserRouter);
router.use(logRouter);

module.exports = router;
