import moment from 'moment';
export const students = [
  {
    firstName: 'Ovishek',
    lastName: 'Paul',
    registrationNo: '2015331005',
    userType: 'student',
    department: {
      departmentName: 'Computer Science and Engineering',
      departmentCode: 'CSE'
    },
    credential: {
      email: 'ovishek@student.com',
      password: '$2y$12$mMqsSEanuEBmpcHn/FAa4.z9thUDsh0zT1JcYXvEbIqE.sBkNIEFi',
      userType: 'student'
    }
  },
  {
    firstName: 'Humayan',
    lastName: 'Kabir',
    registrationNo: '2015331040',
    userType: 'student',
    department: {
      departmentName: 'Computer Science and Engineering',
      departmentCode: 'CSE'
    },
    credential: {
      email: 'kabir@student.com',
      password: '$2y$12$mMqsSEanuEBmpcHn/FAa4.z9thUDsh0zT1JcYXvEbIqE.sBkNIEFi',
      userType: 'student'
    }
  }
];

export const courses = [
  {
    title: 'Programming With C',
    courseCode: 'CSE 133',
    department: {
      departmentName: 'Computer Science and Engineering',
      departmentCode: 'CSE'
    },
    assignedTeacher: {
      firstName: 'Saiful',
      lastName: 'Islam'
    },
    status: 'Upcoming',
    startDate: moment('2021-02-08 09:30:26.123+07:00'),
    endDate: moment('2021-02-08 10:10:26.123+07:00'),
    enrolledStudents : [ 
      "601f36f3d3acc5e913528152", 
      "601f36b4d3acc5e913528125"
    ],
    pendingEnrollStudents : [ 
        "601f36f3d3acc5e913528152"
    ],
  }
];

export const exams = [
  {
    title: 'Term Test 01',
    startDate: moment('2021-02-08 09:30:26.123+07:00'),
    endDate: moment('2021-02-08 10:10:26.123+07:00'),
    status: 'Upcoming',
    totalMarks: 100,
    department: {
      departmentName: 'Computer Science and Engineering',
      departmentCode: 'CSE'
    },
    questions: [],
    participants: [
      "601f36f3d3acc5e913528152", 
      "601f36b4d3acc5e913528125"
    ],
    bannedParticipants: ["601f36f3d3acc5e913528152"],
    papers: []
  },
  {
    title: 'Final C++',
    startDate: moment('2021-03-09 09:30:26.123+06:00'),
    endDate: moment('2021-03-09 12:10:26.123+06:00'),
    status: 'Upcoming',
    department: {
      departmentName: 'Computer Science and Engineering',
      departmentCode: 'CSE'
    },
    questions: [],
    participants: [
      "601f36f3d3acc5e913528152", 
      "601f36b4d3acc5e913528125"
    ],
    bannedParticipants: ["601f36b4d3acc5e913528125"],
    papers: []
  }
];

export const questions = [
  {
    title: 'Question 01',
    authorID: 'Enamul Hasan',
    type: 'MCQ',
    body: `
    On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.
    `,
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