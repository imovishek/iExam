import produce from 'immer';
import { ON_UPDATE_COURSES } from './constants'

const INITIAL_STATE = { courses: [] };

const reducer = produce((draft, action) => {
  switch (action.type) {
    case ON_UPDATE_COURSES:
      draft.courses = action.courses;
      break;
  }
}, INITIAL_STATE)

export default reducer
