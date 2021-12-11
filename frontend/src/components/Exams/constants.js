import BroadBody from "./Student/components/BroadBody";
import FillBlankBody from "./Common/FillBlankBody";
import MCQBody from "./Student/components/MCQBody";
import {
  BROAD,
  FILLINTHEBLANK,
  MATCHING,
  MCQ,
} from "../../utitlities/constants";
import MatchingBody from "./Common/MatchingBody";

export const ON_UPDATE_EXAMS = "exams/ON_UPDATE_EXAMS";
export const ON_UPDATE_CURRENT_TAB = "exams/ON_UPDATE_CURRENT_TAB";
export const ON_UPDATE_CLARIFICATION_TAB = "exams/ON_UPDATE_CLARIFICATION_TAB";
export const ON_VIEW_STUDENT_LOG = "exam/ON_VIEW_STUDENT_LOG";
export const typeToQuestionBody = {
  [MCQ]: MCQBody,
  [BROAD]: BroadBody,
  [FILLINTHEBLANK]: FillBlankBody,
  [MATCHING]: MatchingBody,
};
