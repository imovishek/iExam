import produce from 'immer';
import { SET_IS_COLLAPSED, SET_NAVIGATION_TAB } from './constants'

const INITIAL_STATE = {
  isCollapsed: false,
};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case SET_NAVIGATION_TAB:
      draft.tabKey = action.key;
      break;
    case SET_IS_COLLAPSED:
      draft.isCollapsed = action.isCollapsed;
      break;
  }
}, INITIAL_STATE)

export default reducer
