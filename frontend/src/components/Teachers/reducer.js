import produce from 'immer';
import { ON_UPDATE_TEACHERS } from './constants'

const INITIAL_STATE = { teachers: [] }

const reducer = produce((draft, action) => {
  switch (action.type) {
    case ON_UPDATE_TEACHERS:
      draft.teachers = action.teachers
      break;
  }
}, INITIAL_STATE);

export default reducer;

