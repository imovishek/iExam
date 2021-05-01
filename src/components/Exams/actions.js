import { ON_UPDATE_CURRENT_TAB, ON_UPDATE_EXAMS } from './constants'

export const onUpdateExams = (exams) => ({
  type: ON_UPDATE_EXAMS,
  exams
})

export const onUpdateCurrentTab = (currentTab) => ({
  type: ON_UPDATE_CURRENT_TAB,
  currentTab
})
