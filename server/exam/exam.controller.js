const examHelper = require('./exam.helper');
const studentHelper = require('../student/student.helper');
const questionHelper = require('../question/question.helper');
const courseHelper = require('../course/course.helper');
const { httpStatuses } = require('../constants');
const _ = require('underscore');

// GET EXAM

exports.getExams = async (req, res) => {
  const { query } = req;
  try {
    const result = await examHelper.getExams(query);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
      .status(httpStatuses.INTERNAL_SERVER_ERROR)
      .send({ error: true, message: err.message });
  }
};
const getExamWithParticipants = async (result) => {
  const course = await courseHelper.getCourseByID(result.course._id);
  const participants = _.filter(course.enrolledStudents, st => !_.any(result.bannedParticipants, pt => String(pt._id) === String(st._id)));
  console.log(course.enrolledStudents, result.bannedParticipants);
  result.participants = participants;
  return result;
}
exports.getExamByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await examHelper.getExamByID(id);
    const course = await courseHelper.getCourseByID(result.course._id);
    const participants = _.filter(course.enrolledStudents, st => !_.any(result.bannedParticipants, pt => String(pt._id) === String(st._id)));
    console.log(course.enrolledStudents, result.bannedParticipants);
    result.participants = participants;
    const ret = {
      ...result,
      participants
    };
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};

exports.getExamByIDWithUserPaper = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const { student } = req.query;
  const studentID = student ? student : req.user._id;
  console.log(studentID, req.user._id);
  let newPaper = null;
  try {
    const result = await examHelper.getExamByID(id);
    const papers = _.filter(result.papers, paper => String(paper.student) === studentID);
    let paper = null;
    console.log(result.papers, papers);
    if (papers.length === 1) {
      paper = papers[0];
      const studentObj = await studentHelper.getStudentByID(paper.student);
      const newAnswers = await Promise.all(_.map(paper.answers, async answer => {
        const { question } = answer;
        const ret = {};
        const questionObj = await questionHelper.getQuestionByID(question);
        ret.question = questionObj;
        ret.answer = answer.answer;
        ret.marks = answer.marks
        return ret;
      }));
      paper.answers = newAnswers;
      console.log(paper.answers);
      paper.student = studentObj;
      newPaper = {
        student: studentObj,
        answers: newAnswers,
        totalMarks: paper.totalMarks
      };
    }
    const updatedExam = await getExamWithParticipants(result);
    res.status(httpStatuses.OK).send({ payload: { exam: updatedExam, paper: newPaper } });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};

exports.updateExamPaperForStudent = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const { paper } = req.body;
  console.log('65', paper);
  try {
      delete paper.totalMarks;
      _.forEach(paper.answers, answer => { delete answer.marks });
      await examHelper.updateExamByID(id, { $pull: { papers: { student: req.user._id } } });
      const result = await examHelper.updateExamByID(id, { $push: { papers: paper } });

      console.log('65', result.papers);
      res.status(httpStatuses.OK).send({ payload: { exam: result } });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};

exports.updateExamPaperForTeacher = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const { paper } = req.body;
  if (req.user.userType !== 'teacher') throw new Error('User requested is not authorized!');
  try {
      await examHelper.updateExamByID(id, { $pull: { papers: { student: paper.student } } });
      const result = await examHelper.updateExamByID(id, { $push: { papers: paper } }); // need to fix bug about if at the same time update teacher and student happens

      console.log('65', result.papers);
      res.status(httpStatuses.OK).send({ payload: { exam: result } });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};

// CREATE EXAM
exports.createExam = async (req, res) => {
  const { exam } = req.body;
  try {
    const result = await examHelper.createExam(exam);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};

// UPDATE EXAM
exports.updateExams = async (req, res) => {
  const { query, body } = req;
  try {
    const result = await examHelper.updateExams(query, body);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};

exports.updateExamByID = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const result = await examHelper.updateExamByID(id, body.update);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};


// DELETE EXAM
exports.deleteExams = async (req, res) => {
  const { query } = req;
  try {
    const result = await examHelper.deleteExams(query);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};

exports.deleteExamByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await examHelper.deleteExamByID(id);
    res.status(httpStatuses.OK).send({ payload: result });
  } catch (err) {
    console.log(err);
    res
    .status(httpStatuses.INTERNAL_SERVER_ERROR)
    .send({ error: true, message: err.message });
  }
};
