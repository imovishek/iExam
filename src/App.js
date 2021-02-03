import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
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

require('dotenv').config();
const loadUser = (dispatch) => {
  const user = jwt.decode(localStorage.token);
  const tabKey = localStorage.tabKey || "dashboard";
  dispatch(setUserAction(user));
  dispatch(setNavigaitonTabAction(tabKey));
};

const App = ({ user, dispatch }) => {
  const history = useHistory();
  if (!user || !user.credential) {
    if (!localStorage.token) return <Login />;
    else loadUser(dispatch);
    return <div></div>;
  }
  console.log(user);
  let userType = "";
  if (user.credential) userType = user.credential.userType;
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/dashboard" component={Dashboard} />
          { hasPageAccess[userType] && hasPageAccess[userType].Courses && <Route path="/courses" component={Courses} /> }
          { hasPageAccess[userType] && hasPageAccess[userType].Teachers && <Route path="/teachers" component={Teachers} /> }
          <Route path="/" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.login.user
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
