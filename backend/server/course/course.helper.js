const Course = require('./course.model');
const _ = require('underscore');
const moment = require('moment');

// CREATE
exports.createCourse = (course) =>
  Course.create(course);

// GET
exports.getCourseByID = (_id, sort = { createdAt: -1 }) =>
  Course.findOne({ _id })
    .populate("enrolledStudents")
    .populate("pendingEnrollStudents")
    .populate({
      path: 'exams',
      populate: { path: 'course', model: 'Course' },
      options: { sort }
    })
    .populate("assignedTeacher");

exports.getCourses = (query, sort = { createdAt: -1 }) =>
  Course.find(query)
    .populate("enrolledStudents")
    .populate("pendingEnrollStudents")
    .populate({
      path: 'exams',
      populate: { path: 'course', model: 'Course' },
      options: { sort }
    })
    .populate("assignedTeacher")
    .sort(sort);


// UPDATE
exports.updateCourseByID = (_id, body) =>
  Course.findOneAndUpdate({ _id }, body, { new: true });

exports.updateCourses = (query, body) =>
  Course.updateMany(query, body, { new: true });

// DELETE
exports.deleteCourseByID = _id => {
  if (!_id) return null;
  return Course.findOneAndRemove({ _id });
}

exports.deleteCourses = query => {
  if (_.isEmpty(query)) return null;
  return Course.remove(query);
}

exports.createOrUpdateCourse = (courses = [], user) => {
  return Promise.all(courses.map(async course => {
    const oldCourseCount = await Course.find({
      title: course.title,
      courseCode: course.courseCode,
      'department.departmentCode': user.department.departmentCode,
      batchCode: course.batchCode,
      startDate: {
        $gte: moment(course.startDate).startOf('day'),
        $lte: moment(course.startDate).endOf('day'),
      }
    }).countDocuments();
    if (oldCourseCount) return null;
    return new Course(course).save();
  }));
}
