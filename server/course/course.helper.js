const Course = require('./course.model');
const _ = require('underscore');

// CREATE
exports.createCourse = (course) =>
  Course.create(course);

// GET
exports.getCourseByID = (_id) =>
  Course.findOne({ _id })
    .populate("enrolledStudents")
    .populate("pendingEnrollStudents")
    .populate({
      path: 'exams',
      populate: { path: 'course', model: 'Course' }
    })
    .populate("assignedTeacher");

exports.getCourses = (query) =>
  Course.find(query)
    .populate("enrolledStudents")
    .populate("pendingEnrollStudents")
    .populate({
      path: 'exams',
      populate: { path: 'course', model: 'Course' }
    })
    .populate("assignedTeacher");


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
