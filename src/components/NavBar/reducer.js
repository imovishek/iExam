import produce from 'immer';
import { SET_NAVIGATION_TAB } from './constants'

const INITIAL_STATE = {};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case SET_NAVIGATION_TAB:
      draft.tabKey = action.key;
      break;
  }
}, INITIAL_STATE)

export default reducer
