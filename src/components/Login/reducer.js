import produce from 'immer';
import { SET_USER } from './constants'

const INITIAL_STATE = { user: {} };

const reducer = produce((draft, action) => {
  switch (action.type) {
    case SET_USER:
      draft.user = action.user
      break;
  }
}, INITIAL_STATE)
export default reducer
