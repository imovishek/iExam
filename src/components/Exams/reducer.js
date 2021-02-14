import { ON_UPDATE_EXAMS } from './constants'

const reducer = (state = { exams: [] }, action) => {
  switch (action.type) {
    case ON_UPDATE_EXAMS:
      return {
        ...state,
        exams: action.exams
      }
    default:
      return state
  }
}

export default reducer
