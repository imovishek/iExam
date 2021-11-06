import { ON_UPDATE_STUDENTS } from './constants'

export const onUpdateStudents = (students) => ({
  type: ON_UPDATE_STUDENTS,
  students
})
