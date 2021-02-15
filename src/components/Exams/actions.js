import { ON_UPDATE_EXAMS } from './constants'

export const onUpdateExams = (exams) => ({
  type: ON_UPDATE_EXAMS,
  exams
})
