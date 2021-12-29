import {
  AN_EXAM_STARTED,
  ON_UPDATE_CLARIFICATION_TAB,
  ON_UPDATE_CURRENT_TAB,
  ON_UPDATE_EXAMS,
  ON_VIEW_STUDENT_LOG,
} from "./constants";

import moment from "moment";

export const onUpdateExams = (exams) => ({
  type: ON_UPDATE_EXAMS,
  exams,
});

export const onUpdateCurrentTab = (currentTab) => ({
  type: ON_UPDATE_CURRENT_TAB,
  currentTab,
});

export const onUpdateClarificationTab = (clarificationTab) => ({
  type: ON_UPDATE_CLARIFICATION_TAB,
  clarificationTab,
});

export const onViewStudentLog = (student) => ({
  type: ON_VIEW_STUDENT_LOG,
  student,
});

export const onAnExamStarted = (exam) => {
  if (exam === null)
    return {
      type: AN_EXAM_STARTED,
      exam,
    };

  // return {
  //   type: AN_EXAM_STARTED,
  //   exam,
  // };

  const examStart = moment(exam.startDate);
  const startTime = moment(exam.startTime, "hh:mm A");

  examStart.set("hour", startTime.get("hour"));
  examStart.set("minute", startTime.get("minute"));

  const duration = exam.duration.split(":");
  const dHour = parseInt(duration[0]);
  const dMin = parseInt(duration[1]);

  const examEnd = moment(examStart.toString());
  examEnd.add(dHour, "hour");
  examEnd.add(dMin, "minute");

  return {
    type: AN_EXAM_STARTED,
    exam: {
      examStartString: examStart.toISOString(),
      examEnd,
      examName: exam.examTitle,
      courseName: `${exam.courseCode}: ${exam.courseTitle}`,
    },
  };
};
