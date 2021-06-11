import { lazy } from 'react'
import './App.less'
import { setUserAction } from './components/Login/actions'
import { setNavigaitonTabAction } from './components/NavBar/actions'
import api from './utitlities/api'
import ExamsForTeacher from './components/Exams/Teacher/index'
import Credits from './components/Credits/index'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router'
const Login = lazy(() => import('./components/Login/Login'));
const DashboardForTeacher = lazy(() => import('./components/Dashboard/Teacher/Dashboard'));
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const DashboardPageForStudent = lazy(() => import('./components/Dashboard/Student/Dashboard'));
const Logout = lazy(() => import('./components/Logout/Logout'));
const CoursesForAdmin = lazy(() => import('./components/Courses/DeptAdmin/Courses'));
const CoursePageForTeacher = lazy(() => import('./components/Courses/Teacher/CoursePage'));
const CoursesForTeacher = lazy(() => import('./components/Courses/Teacher/Courses')); 
const CoursePageForAdmin = lazy(() => import('./components/Courses/DeptAdmin/CoursePage'));
const TeachersForAdmin = lazy(() => import('./components/Teachers/DeptAdmin/Teachers'));
const StudentsForAdmin = lazy(() => import('./components/Students/DeptAdmin/Students'));
const ExamPageForAdmin = lazy(() => import('./components/Exams/DeptAdmin/ExamPage'));
const QuestionPageForTeacher = lazy(() => import('./components/Question/Teacher/QuestionPage'));
const Loading = lazy(() => import('./components/Common/Loading'));
const ExamsForStudent = lazy(() => import('./components/Exams/Student/index'));
const QuestionViewPageForTeacher = lazy(() => import('./components/Exams/Teacher/QuestionView'));
const CoursesForStudent = lazy(() => import('./components/Courses/Student'));
const QuestionsForTeacher = lazy(() => import('./components/Question/Teacher/Questions'))
const CoursePageForStudents = lazy(() => import('./components/Courses/Student/CoursePage'));
const ExamPageForTeacher = lazy(() => import('./components/Exams/Teacher/ExamPage'));
const ExamPageForStudents = lazy(() => import('./components/Exams/Student/ExamPage'));
const ResultsForStudent = lazy(() => import('./components/Results/Student/Results'));
const EvaluatePaper = lazy(() => import('./components/Exams/Teacher/EvaluatePaper'));
const ExamResult = lazy(() => import('./components/Exams/Teacher/ExamResult'));
const NotFound = lazy(() => import('./components/Common/404'));

require('dotenv').config()
const loadUser = async (dispatch) => {
  try {
    const { payload: user } = await api.getUserMe();
    dispatch(setUserAction(user))
  } catch (err) {
    console.log(err)
    localStorage.clear()
    dispatch(push('/login'))
  }
}
const loadInit = async (dispatch) => {
  await loadUser(dispatch)
  const tabKey = localStorage.tabKey || 'dashboard'
  dispatch(setNavigaitonTabAction(tabKey))
}

const App = ({ user, dispatch }) => {
  if (!user || !user.userType) {
    if (!localStorage.token) return <Login />
    else loadInit(dispatch);
    return <Loading isLoading={true} />
  }
  let userType = ''
  if (user) userType = user.userType
  return (
    <Switch>
      { userType === 'student' && <Route path="/exams" component={ExamsForStudent} /> }
      { userType === 'student' && <Route exact path="/" component={DashboardPageForStudent} /> }
      { userType === 'student' && <Route path="/dashboard" component={DashboardPageForStudent} /> }
      { userType === 'student' && <Route path="/courses" component={CoursesForStudent} /> }
      { userType === 'student' && <Route path="/course/:id" component={CoursePageForStudents} /> }
      { userType === 'student' && <Route path="/exam/:id" component={ExamPageForStudents} /> }
      { userType === 'student' && <Route path="/results" component={ResultsForStudent} /> }
      { userType === 'deptAdmin' && <Route path="/courses" component={CoursesForAdmin} /> }
      { userType === 'deptAdmin' && <Route path="/course/:id" component={CoursePageForAdmin} /> }
      { userType === 'deptAdmin' && <Route path="/teachers" component={TeachersForAdmin} /> }
      { userType === 'deptAdmin' && <Route path="/students" component={StudentsForAdmin} /> }
      { userType === 'deptAdmin' && <Route path="/exam/:id" component={ExamPageForAdmin} /> }
      { userType === 'teacher' && <Route path="/question/:questionID" component={QuestionPageForTeacher} /> }
      { userType === 'teacher' && <Route path="/questions" component={QuestionsForTeacher} /> }
      { userType === 'teacher' && <Route path="/exam/:examID/question/view/:questionID" component={QuestionViewPageForTeacher} /> }
      { userType === 'teacher' && <Route path="/exam/:examID/question/:questionID" component={QuestionPageForTeacher} /> }
      { userType === 'teacher' && <Route path="/courses" component={CoursesForTeacher} /> }
      { userType === 'teacher' && <Route path="/exam/:examID/paper/question/:questionID" component={EvaluatePaper} /> }
      { userType === 'teacher' && <Route path="/exam/:examID/paper/:studentID" component={EvaluatePaper} /> }
      { userType === 'teacher' && <Route path="/course/:id" component={CoursePageForTeacher} /> }
      { userType === 'teacher' && <Route path="/exam/:examID/result" component={ExamResult} /> }
      { userType === 'teacher' && <Route path="/exam/:id" component={ExamPageForTeacher} /> }
      { userType === 'teacher' && <Route path="/exams" component={ExamsForTeacher} /> }
      { userType === 'teacher' && <Route path="/dashboard" component={DashboardForTeacher} /> }
      <Route path="/login" component={Login} />
      <Route path="/credits" component={Credits} />
      <Route path="/logout" component={Logout} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/404" component={NotFound} />
      { userType === 'teacher' && <Route path="/" component={DashboardForTeacher} /> }
      <Route path="/" component={Dashboard} />
    </Switch>
  )
}

const mapStateToProps = state => ({
  user: state.login.user
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
