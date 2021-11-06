import produce from 'immer';
import { ON_UPDATE_STUDENTS } from './constants'

const INITIAL_STATE = { students: [] };

const reducer = produce((draft, action) => {
  switch (action.type) {
    case ON_UPDATE_STUDENTS:
      draft.students = action.students;
      break;
  }
}, INITIAL_STATE);

export default reducer;