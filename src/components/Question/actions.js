import { ON_UPDATE_QUESTIONS } from "./constants";

export const onUpdateQuestions = (questions) => ({
  type: ON_UPDATE_QUESTIONS,
  questions,
})