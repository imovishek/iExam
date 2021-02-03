import { SET_NAVIGATION_TAB } from './constants';

const reducer = (state = {}, action) => {
    switch(action.type) {
        case SET_NAVIGATION_TAB:
            return { ...state, tabKey: action.key };
        default:
          return state;
    }
};

export default reducer;