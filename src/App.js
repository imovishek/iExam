import './App.css';
import { Route, Switch } from "react-router";
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Logout from './components/Logout/Logout';
import CoursesForAdmin from './components/Courses/DeptAdmin/Courses';
import CoursePageForTeacher from './components/Courses/Teacher/CoursePage';
import CoursesForTeacher from './components/Courses/Teacher/Courses';
import CoursePageForAdmin from './components/Courses/DeptAdmin/CoursePage';
import { connect } from 'react-redux';
import { hasPageAccess } from './utitlities/constants';
import TeachersForAdmin from './components/Teachers/DeptAdmin/Teachers';
import StudentsForAdmin from './components/Students/DeptAdmin/Students';
import jwt from 'jsonwebtoken';
import { setUserAction } from './components/Login/actions';
import { setNavigaitonTabAction } from './components/NavBar/actions';
import ExamPageForAdmin from './components/Exams/DeptAdmin/ExamPage';
import QuestionPageForTeacher from './components/Question/Teacher/QuestionPage';
import api from './utitlities/api';
import Loading from './components/Common/Loading';
import ExamsForStudent from './components/Exams/Student/index';
import CoursesForStudent from './components/Courses/Student';
import CoursePageForStudents from './components/Courses/Student/CoursePage';
import ExamPageForStudents from './components/Exams/Student/ExamPage';

require('dotenv').config();
const loadUser = async (dispatch) => {
  const localUser = jwt.decode(localStorage.token);
  const { payload: user } = await api.getUserByID(localUser._id);
  dispatch(setUserAction(user));
}
const loadInit = async (dispatch) => {
  await loadUser(dispatch);
  const tabKey = localStorage.tabKey || "dashboard";
  dispatch(setNavigaitonTabAction(tabKey));
};

const App = ({ user, dispatch }) => {
  if (!user || !user.credential) {
    if (!localStorage.token) return <Login />;
    else loadInit(dispatch);
    return <Loading isLoading={true} />;
  }
  let userType = "";
  if (user.credential) userType = user.credential.userType;
  return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/dashboard" component={Dashboard} />
        { userType === "student" && <Route path="/exams" component={ExamsForStudent} /> }
        { userType === "student" && <Route path="/courses" component={CoursesForStudent} /> }
        { userType === "student" && <Route path="/course/:id" component={CoursePageForStudents} /> }
        { userType === "student" && <Route path="/exam/:id" component={ExamPageForStudents} /> }
        { userType === "deptAdmin" && <Route path="/courses" component={CoursesForAdmin} /> }
        { userType === "deptAdmin" && <Route path="/course/:id" component={CoursePageForAdmin} /> }
        { userType === "deptAdmin" && <Route path="/teachers" component={TeachersForAdmin} /> }
        { userType === "deptAdmin" && <Route path="/students" component={StudentsForAdmin} /> }
        { userType === "deptAdmin" && <Route path="/exam/:id" component={ExamPageForAdmin} /> }
        { userType === "teacher" && <Route path="/question/:id" component={QuestionPageForTeacher} /> }
        { userType === "teacher" && <Route path="/courses" component={CoursesForTeacher} /> }
        { userType === "teacher" && <Route path="/course/:id" component={CoursePageForTeacher} /> }
        <Route path="/" component={Dashboard} />
      </Switch>
  );
}

const mapStateToProps = state => ({
  user: state.login.user
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
