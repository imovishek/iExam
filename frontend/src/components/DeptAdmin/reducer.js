import produce from 'immer';
import { ON_UPDATE_DEPTADMINS } from './constants'

const INITIAL_STATE = { deptAdmins: [] };

const reducer = produce((draft, action) => {
  switch (action.type) {
    case ON_UPDATE_DEPTADMINS:
      draft.deptAdmins = action.deptAdmins;
      break;
  }
}, INITIAL_STATE);

export default reducer;