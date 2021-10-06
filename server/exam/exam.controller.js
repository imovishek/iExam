const examHelper = require('./exam.helper');
const studentHelper = require('../student/student.helper');
const questionHelper = require('../question/question.helper');
const courseHelper = require('../course/course.helper');
const paperHelper = require('../paper/paper.helper');
const { httpStatuses, STUDENT, ENDED, RUNNING } = require('../constants');
const _ = require('underscore');
const { getExamStatus, cleanExamForStudent, cleanExamForTeacher } = require('../common.functions');
const responseHandler = require('../middlewares/responseHandler');

// GET EXAM

exports.getExams = async (req, res) => {
  const { query } = req;
  try {
    const result = await examHelper.getExams(query);
    _.forEach(result, exam => {
      cleanExamForStudent(req, exam, false, true);
      cleanExamForTeacher(req, exam, false, false);
    });
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};
const getExamByIDWithParticipants = async (id) => {
  const result = await examHelper.getExamByID(id).lean();
  const course = await courseHelper.getCourseByID(result.course._id);
  // console.log(course.enrolledStudents, result.papers);
  let participants = _.filter(course.enrolledStudents, st => !_.any(result.bannedParticipants, pt => String(pt._id) === String(st._id)));
  result.participants =  _.filter(participants, pt => _.any(result.papers, paper => String(pt._id) === String(paper.student)));
  result.participants.reverse();
  result.bannedParticipants.reverse();
  result.questions.reverse();
  return result;
}
exports.getExamByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getExamByIDWithParticipants(id);
    cleanExamForStudent(req, result, true, false);
    cleanExamForTeacher(req, result, false, false);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.getExamByIDWithUserPaper = async (req, res) => {
  const { id } = req.params;
  const { student, question } = req.query;
  const isRequestFromStudent = req.user.userType === STUDENT;
  const studentID = student ? student : req.user._id;
  let paper = null;
  try {
    const result = await getExamByIDWithParticipants(id);
    const papers = _.filter(result.papers, paper => String(paper.student) === studentID);
    console.log('question', question);
    if (question) {
      paper = {
        student: null,
        answers: [],
      };
      await Promise.all(_.map(result.papers, async resPaper => {
        const answers = _.filter(resPaper.answers, answer => String(answer.questionID) === question)
        const studentObj = await studentHelper.getStudentByID(resPaper.student);
        if (!studentObj) return {};
        const mapStudentIDs = answers.map(answer => ({
          ...answer,
          student: resPaper.student,
          studentName: studentObj.firstName + ' ' + studentObj.lastName,
          paperID: resPaper._id,
        }));
        paper.answers = paper.answers.concat(mapStudentIDs);
      }));
    } else if (papers.length === 1) {
      paper = papers[0];
      paper.answers.forEach(answer => {
        answer.paperID = paper._id;
      })
    } else if (papers.length > 1) {
      throw new Error('Too many papers for one student!');
    } else if (isRequestFromStudent) {
      paper = await paperHelper.createPaper({
        student: studentID,
        answers: [],
        totalMarks: 0,
        examID: id,
        isSubmitted: false,
      });
      await examHelper.updateExamByID(id, {
        $push: {
          papers: paper._id,
        },
        $addToSet: {
          participants: req.user._id,
        }
      });
    }

    cleanExamForStudent(req, result, false, false);
    cleanExamForTeacher(req, result, false, false);
    responseHandler(res, httpStatuses.OK, { payload: { exam: result, paper } });
  } catch (err) {
    console.log(err);
    responseHandler(res. httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.getExamUsingFilterByID = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  try {
    const exams = await examHelper.getExamAggregate(id, body);
    responseHandler(res, httpStatuses.OK, { payload: exams[0] });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
}

// UPDATE

exports.updateExamPaperForStudent = async (req, res) => {
  const { id } = req.params;
  const { paper } = req.body;
  try {
    const dbPaper = await paperHelper.getPaperByID(paper._id);
    const queObj = {};
    _.forEach(dbPaper.answers, answer => {
      queObj[String(answer.questionID)] = 1;
    });
    const exams = await examHelper.getExamAggregate(id, { startDate: 1, startTime: 1, duration: 1, bannedParticipants: 1 });
    const status = getExamStatus(exams[0]);
    const amIBanned = exams[0].bannedParticipants.filter(bannedID => String(bannedID) === req.user._id)[0];
    if (status !== RUNNING) throw new Error("Exam ended can't take submission");
    if (amIBanned) throw new Error("You got banned, please contact your course teacher");
    await Promise.all(_.map(paper.answers, async answer => {
        if (queObj[answer.questionID]) {
          await paperHelper.updatePapers({
              _id: paper._id,
              'answers.questionID': answer.questionID,
            }, {
              'answers.$.answer': answer.answer,
              isSubmitted: true,
              lastSubmittedAt: Date.now(),
          });
        } else {
          await paperHelper.updatePaperByID(paper, {
            $push: {
              answers: {
                questionID: answer.questionID,
                answer: answer.answer,
                marks: 0,
              }
            },
            isSubmitted: true,
            lastSubmittedAt: Date.now(),
          });
        }
      }
    ));
    await examHelper.updateExamByID(id, {
      $addToSet: {
        participants: req.user._id,
      }
    });
    responseHandler(res, httpStatuses.OK, { payload: {} });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.updateExamPaperForTeacher = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const { paper } = req.body;
  if (req.user.userType !== 'teacher') throw new Error('User requested is not authorized!');
  try {
    const exam = await examHelper.getExamByID(id);
    const questionsObj = {};
    _.forEach(exam.questions, question => questionsObj[String(question._id)] = true);
    const groupedAnswers = _.groupBy(paper.answers, answer => answer.paperID);
    await Promise.all(_.map(groupedAnswers, async (answers, paperID) => {
        const actualPaper = await paperHelper.getPaperByID(paperID);
        answers.forEach(answer => {
          if (!questionsObj[answer.questionID]) return;
          const oldAnswer = actualPaper.answers.filter(oldAnswer => String(oldAnswer.questionID) === String(answer.questionID))[0];
          oldAnswer.marks = answer.marks;
        })
        actualPaper.totalMarks = _.reduce(actualPaper.answers, (sum, answer) => {
          if (!questionsObj[answer.questionID]) return sum;
          return sum + Number(answer.marks);
        }, 0);
        await actualPaper.save();
      }
    ));
    responseHandler(res, httpStatuses.OK, { payload: {} });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

// CREATE EXAM
exports.createExam = async (req, res) => {
  const { exam } = req.body;
  try {
    const result = await examHelper.createExam(exam);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

// UPDATE EXAM
exports.updateExams = async (req, res) => {
  const { query, body } = req;
  try {
    const result = await examHelper.updateExams(query, body);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.updateExamByID = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const result = await examHelper.updateExamByID(id, body.update);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};


// DELETE EXAM
exports.deleteExams = async (req, res) => {
  const { query } = req;
  try {
    const result = await examHelper.deleteExams(query);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};

exports.deleteExamByID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await examHelper.deleteExamByID(id);
    responseHandler(res, httpStatuses.OK, { payload: result });
  } catch (err) {
    console.log(err);
    responseHandler(res, httpStatuses.INTERNAL_SERVER_ERROR, { error: true, message: err.message });
  }
};
