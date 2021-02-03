const express = require('express');
const router = express.Router();

const authRouter = require('./auth/auth.route');
const courseRouter = require('./course/course.route');

router.use(authRouter);
router.use(courseRouter);

module.exports = router;