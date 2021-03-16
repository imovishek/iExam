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

export const ON_UPDATE_EXAMS = "ON_UPDATE_EXAMS";

export const typeToQuestionBody = {
  [MCQ]: MCQBody,
  [BROAD]: BroadBody,
  [FILLINTHEBLANK]: FillBlankBody,
  [MATCHING]: MatchingBody,
};
