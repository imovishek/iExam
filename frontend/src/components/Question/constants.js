import {
  BROAD,
  FILLINTHEBLANK,
  MATCHING,
  MCQ,
} from "../../utitlities/constants";
import MatchingBody from "./Teacher/components/MatchingBody";
import Broad from "./Teacher/components/Broad";
import FillInTheBlank from "./Teacher/components/FillInTheBlank";
import MCQBody from "./Teacher/components/MCQ";

export const ON_UPDATE_QUESTIONS = "ON_UPDATE_QUESTIONS";

export const questionTypes = {
  mcq: "MCQ",
  broad: "Broad",
  fillInTheBlank: "Fill in the Blank",
  [MATCHING]: "Matching Question",
};

export const typeToQuestionBody = {
  [MCQ]: MCQBody,
  [BROAD]: Broad,
  [FILLINTHEBLANK]: FillInTheBlank,
  [MATCHING]: MatchingBody,
};
