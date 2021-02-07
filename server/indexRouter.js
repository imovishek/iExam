const express = require('express');
const router = express.Router();

const authRouter = require('./auth/auth.route');
const courseRouter = require('./course/course.route');
const teacherRouter = require('./teacher/teacher.route');
const studentRouter = require('./student/student.route');
const questionRouter = require('./question/question.route');
const examRouter = require('./exam/exam.route');
const deptAdminRouter = require('./deptAdmin/deptAdmin.route');
const credentialRouter = require('./credential/credential.route');
const userRouter = require('./user/user.route');

router.use(authRouter);
router.use(courseRouter);
router.use(teacherRouter);
router.use(studentRouter);
router.use(questionRouter);
router.use(examRouter);
router.use(deptAdminRouter);
router.use(credentialRouter);
router.use(userRouter);

module.exports = router;