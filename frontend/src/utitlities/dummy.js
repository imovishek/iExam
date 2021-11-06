import moment from 'moment'
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
    registrationNo: '2015331057',
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
]

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
    enrolledStudents: [
      '601f36f3d3acc5e913528152',
      '601f36b4d3acc5e913528125'
    ],
    pendingEnrollStudents: [
      '601f36f3d3acc5e913528152'
    ]
  }
]

export const exams = [
  {
    title: 'Term Test 01',
    startDate: moment('2021-02-08 09:30:26.123+07:00'),
    endDate: moment('2021-02-08 10:10:26.123+07:00'),
    status: 'Upcoming',
    totalMarks: 100,
    course: {
      title: 'C Programming'
    },
    department: {
      departmentName: 'Computer Science and Engineering',
      departmentCode: 'CSE'
    },
    questions: [],
    participants: [
      '601f36f3d3acc5e913528152',
      '601f36b4d3acc5e913528125'
    ],
    bannedParticipants: ['601f36f3d3acc5e913528152'],
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
      '601f36f3d3acc5e913528152',
      '601f36b4d3acc5e913528125'
    ],
    bannedParticipants: ['601f36b4d3acc5e913528125'],
    papers: []
  },
  {
    title: 'Term Test 01',
    startDate: moment('2021-02-08 09:30:26.123+07:00'),
    endDate: moment('2021-02-08 10:10:26.123+07:00'),
    status: 'Upcoming',
    totalMarks: 100,
    course: {
      title: 'C Programming'
    },
    department: {
      departmentName: 'Computer Science and Engineering',
      departmentCode: 'CSE'
    },
    questions: [],
    participants: [
      '601f36f3d3acc5e913528152',
      '601f36b4d3acc5e913528125'
    ],
    bannedParticipants: ['601f36f3d3acc5e913528152'],
    papers: []
  },
  {
    title: 'Term Test 01',
    startDate: moment('2021-02-08 09:30:26.123+07:00'),
    endDate: moment('2021-02-08 10:10:26.123+07:00'),
    status: 'Upcoming',
    totalMarks: 100,
    course: {
      title: 'C Programming'
    },
    department: {
      departmentName: 'Computer Science and Engineering',
      departmentCode: 'CSE'
    },
    questions: [],
    participants: [
      '601f36f3d3acc5e913528152',
      '601f36b4d3acc5e913528125'
    ],
    bannedParticipants: ['601f36f3d3acc5e913528152'],
    papers: []
  },
  {
    title: 'Term Test 01',
    startDate: moment('2021-02-08 09:30:26.123+07:00'),
    endDate: moment('2021-02-08 10:10:26.123+07:00'),
    status: 'Upcoming',
    totalMarks: 100,
    course: {
      title: 'C Programming'
    },
    department: {
      departmentName: 'Computer Science and Engineering',
      departmentCode: 'CSE'
    },
    questions: [],
    participants: [
      '601f36f3d3acc5e913528152',
      '601f36b4d3acc5e913528125'
    ],
    bannedParticipants: ['601f36f3d3acc5e913528152'],
    papers: []
  },
  {
    title: 'Term Test 01',
    startDate: moment('2021-02-08 09:30:26.123+07:00'),
    endDate: moment('2021-02-08 10:10:26.123+07:00'),
    status: 'Upcoming',
    totalMarks: 100,
    course: {
      title: 'C Programming'
    },
    department: {
      departmentName: 'Computer Science and Engineering',
      departmentCode: 'CSE'
    },
    questions: [],
    participants: [
      '601f36f3d3acc5e913528152',
      '601f36b4d3acc5e913528125'
    ],
    bannedParticipants: ['601f36f3d3acc5e913528152'],
    papers: []
  }
]


export const announcements = [
  'There will be three more exams',
  "Today's exam will be cancelled",
  'Hello, welcome to the course',
  "What's up?"
];

