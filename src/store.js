import { createStore } from "redux";
import rootReducer from './rootReducer';

function configureStore(state = { user: {} }) {
  return createStore(rootReducer, state);
}

export default configureStore;