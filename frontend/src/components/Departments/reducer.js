import produce from 'immer';
import { ON_UPDATE_DEPTS } from './constants'

const INITIAL_STATE = { depts: [] };

const reducer = produce((draft, action) => {
  switch (action.type) {
    case ON_UPDATE_DEPTS:
      draft.depts = action.depts;
      break;
  }
}, INITIAL_STATE);

export default reducer;