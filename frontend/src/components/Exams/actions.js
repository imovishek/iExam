import {
  ON_UPDATE_CLARIFICATION_TAB,
  ON_UPDATE_CURRENT_TAB,
  ON_UPDATE_EXAMS,
  ON_VIEW_STUDENT_LOG,
} from "./constants";

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
