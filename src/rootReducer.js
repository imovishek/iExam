import { combineReducers } from "redux";
import loginReducer from './components/Login/reducer';
import navBarReducer from './components/NavBar/reducer';
import coursesReducer from './components/Courses/reducer'

export default combineReducers({
    login: loginReducer,
    navBar: navBarReducer,
    courseData: coursesReducer,
});