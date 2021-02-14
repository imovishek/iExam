import { ON_UPDATE_COURSES } from './constants'

const reducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case ON_UPDATE_COURSES:
      return {
        ...state,
        courses: action.courses
      }
    default:
      return state
  }
}

export default reducer
