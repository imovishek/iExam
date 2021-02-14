export const hasPageAccess = {
  deptAdmin: {
    Courses: true,
    Teachers: true,
    Students: true,
    CoursePage: true,
    ExamPage: true
  },
  student: {
    Exams: true,
    Courses: true
  },
  teacher: {
    Exams: true,
    Courses: true
  }
}

export const ignoreKeys = {
  updatedAt: true,
  createdAt: true,
  __v: true,
  department: true
}
export const timeFormat = 'hh:mm A'
export const durationFormat = 'HH:mm'
