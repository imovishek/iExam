import { ON_UPDATE_TEACHERS } from './constants';

const reducer = (state = { teachers: [] }, action) => {
  switch (action.type) {
    case ON_UPDATE_TEACHERS:
      return {
        ...state,
        teachers: action.teachers
      };
    default:
      return state;
  }
};

export default reducer;
