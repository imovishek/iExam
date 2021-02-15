import { ON_UPDATE_STUDENTS } from './constants'

const reducer = (state = { students: [] }, action) => {
  switch (action.type) {
    case ON_UPDATE_STUDENTS:
      return {
        ...state,
        students: action.students
      }
    default:
      return state
  }
}

export default reducer
