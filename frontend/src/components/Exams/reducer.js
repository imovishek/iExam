import produce from "immer";
import {
  ON_UPDATE_CLARIFICATION_TAB,
  ON_UPDATE_CURRENT_TAB,
  ON_UPDATE_EXAMS,
  ON_VIEW_STUDENT_LOG,
} from "./constants";

const INITIAL_STATE = {
  exams: [],
  currentTab: "running",
  clarificationTab: "Clarifications",
  viewLogForStudent: {},
};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case ON_UPDATE_EXAMS:
      draft.exams = action.exams;
      break;
    case ON_UPDATE_CURRENT_TAB:
      draft.currentTab = action.currentTab;
      break;
    case ON_UPDATE_CLARIFICATION_TAB:
      draft.clarificationTab = action.clarificationTab;
      break;
    case ON_VIEW_STUDENT_LOG:
      draft.viewLogForStudent = action.student;
      break;
  }
}, INITIAL_STATE);

export default reducer;
