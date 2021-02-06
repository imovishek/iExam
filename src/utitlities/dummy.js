import moment from 'moment';
export const students = [
  {
    firstName: 'Ovishek',
    lastName: 'Paul',
    registrationNo: '2015331005'
  },
  {
    firstName: 'Humayan',
    lastName: 'Kabir',
    registrationNo: '2015331057'
  }
];

export const courses = [
  {
    title: 'Programming With C',
    courseCode: 'CSE 133',
    department: {
      departmentName: 'Computer Science and Engineering'
    },
    assignedTeacher: {
      firstName: 'Saiful',
      lastName: 'Islam'
    },
    status: 'Upcoming',
    startDate: moment('2021-02-08 09:30:26.123+07:00'),
    endDate: moment('2021-02-08 10:10:26.123+07:00')
  }
];

export const exams = [
  {
    title: 'Term Test 01',
    startDate: moment('2021-02-08 09:30:26.123+07:00'),
    endDate: moment('2021-02-08 10:10:26.123+07:00'),
    status: 'Upcoming',
    totalMarks: 100,
  },
  {
    title: 'Final C++',
    startDate: moment('2021-03-09 09:30:26.123+06:00'),
    endDate: moment('2021-03-09 12:10:26.123+06:00'),
    status: 'Upcoming'
  }
];

export const questions = [
  {
    title: 'Question 01',
    authorID: 'Enamul Hasan',
    type: 'MCQ',
    marks: 5
  },
  {
    title: 'Question 02',
    authorID: 'Mridul Ahmed',
    type: 'Broad',
    marks: 10
  }
];

export const teachers = [
  {
    firstName: 'Enamul',
    lastName: 'Hasan',
    department: {
      departmentName: 'Computer Science and Engineering',
      departmentCode: 'CSE',
    },
    questions,
  },
  {
    firstName: 'Mridul',
    lastName: 'Ahmed',
    department: {
      departmentName: 'Computer Science and Engineering',
      departmentCode: 'CSE',
    },
    questions,
  }
]