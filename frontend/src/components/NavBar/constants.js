import { faMedal,faBookOpen, faChalkboardTeacher, faChartLine, faPencilRuler, faQuestion, faScroll, faUsers } from "@fortawesome/free-solid-svg-icons";

export const SET_NAVIGATION_TAB = 'navbar/SET_NAVIGATION_TAB'
export const SET_IS_COLLAPSED = 'navbar/SET_IS_COLLAPSED'

export const navLinks = [
  {
    link: 'dashboard',
    body: 'Dashboard',
    icon: faChartLine,
  },
  {
    link: 'courses',
    body: 'Courses',
    icon: faBookOpen,
  },
  {
    link: 'exams',
    body: 'Exams',
    icon: faScroll,
  },
  {
    link: 'teachers',
    body: 'Teachers',
    icon: faChalkboardTeacher,
  },
  {
    link: 'students',
    body: 'Students',
    icon: faUsers,
  },
  {
    link: 'results',
    body: 'Results',
    icon: faPencilRuler,
  },
  {
    link: 'questions',
    body: 'Questions',
    icon: faQuestion,
  },
  {
    link: 'credits',
    body: 'Credits',
    icon: faMedal,
  },
  {
    link: 'departments',
    body: 'Departments',
    icon: faScroll,
  },
  {
    link: 'admins',
    body: 'Admins',
    icon: faUsers,
  },
  
];

export const navKeys = {
  DASHBOARD: 'dashboard',
  EXAMS: 'exams',
  COURSES: 'courses',
};
