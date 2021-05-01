import produce from 'immer';
import { ON_UPDATE_QUESTIONS } from './constants'

const INITIAL_STATE = { questions: [] }

const reducer = produce((draft, action) => {
  switch (action.type) {
    case ON_UPDATE_QUESTIONS:
      draft.questions = action.questions;
      break;
  }
}, INITIAL_STATE);

export default reducer;
