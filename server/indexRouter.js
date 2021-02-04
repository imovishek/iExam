const express = require('express');
const router = express.Router();

const authRouter = require('./auth/auth.route');
const courseRouter = require('./course/course.route');
const teacherRouter = require('./teacher/teacher.route');

router.use(authRouter);
router.use(courseRouter);
router.use(teacherRouter);

module.exports = router;