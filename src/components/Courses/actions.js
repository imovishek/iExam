import { ON_UPDATE_COURSES } from './constants'

export const onUpdateCourses = (courses) => ({
  type: ON_UPDATE_COURSES,
  courses
})
