import './App.css';
import { Route, Switch } from "react-router";
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Logout from './components/Logout/Logout';
import Courses from './components/Courses/Courses';
import { connect } from 'react-redux';
import { hasPageAccess } from './utitlities/constants';
import Teachers from './components/Teachers/Teachers';
import jwt from 'jsonwebtoken';
import { setUserAction } from './components/Login/actions';
import { setNavigaitonTabAction } from './components/NavBar/actions';
import CoursePage from './components/Courses/CoursePage';
import ExamPage from './components/Exam/ExamPage';

require('dotenv').config();
const loadUser = (dispatch) => {
  const user = jwt.decode(localStorage.token);
  const tabKey = localStorage.tabKey || "dashboard";
  dispatch(setUserAction(user));
  dispatch(setNavigaitonTabAction(tabKey));
};

const App = ({ user, dispatch }) => {
  if (!user || !user.credential) {
    if (!localStorage.token) return <Login />;
    else loadUser(dispatch);
    return <div></div>;
  }
  let userType = "";
  if (user.credential) userType = user.credential.userType;
  return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/dashboard" component={Dashboard} />
        { hasPageAccess[userType] && hasPageAccess[userType].Courses && <Route path="/courses" component={Courses} /> }
        { hasPageAccess[userType] && hasPageAccess[userType].CoursePage && <Route path="/course/:id" component={CoursePage} /> }
        { hasPageAccess[userType] && hasPageAccess[userType].Teachers && <Route path="/teachers" component={Teachers} /> }
        { hasPageAccess[userType] && hasPageAccess[userType].ExamPage && <Route path="/exam/:id" component={ExamPage} /> }
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
