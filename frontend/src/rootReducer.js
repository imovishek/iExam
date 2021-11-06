import { combineReducers } from 'redux'
import loginReducer from './components/Login/reducer'
import navBarReducer from './components/NavBar/reducer'
import coursesReducer from './components/Courses/reducer'
import questionReducer from './components/Question/reducer'
import teacherReducer from './components/Teachers/reducer'
import studentReducer from './components/Students/reducer'
import examReducer from './components/Exams/reducer'
import { connectRouter } from 'connected-react-router'

const createReducers = (history) =>
  combineReducers({
    login: loginReducer,
    navBar: navBarReducer,
    courseData: coursesReducer,
    teacherData: teacherReducer,
    studentData: studentReducer,
    questionData: questionReducer,
    examData: examReducer,
    router: connectRouter(history)
  })
export default createReducers
