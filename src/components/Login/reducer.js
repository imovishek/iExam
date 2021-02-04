import { SET_USER } from './constants';

const reducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
};

export default reducer;