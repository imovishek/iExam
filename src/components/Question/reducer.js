import { ON_UPDATE_QUESTIONS } from './constants'

const reducer = (state = { questions: [] }, action) => {
  switch (action.type) {
    case ON_UPDATE_QUESTIONS:
      return {
        ...state,
        questions: action.questions
      }
    default:
      return state
  }
}

export default reducer
