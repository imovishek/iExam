import { ON_UPDATE_TEACHERS } from './constants'

export const onUpdateTeachers = (teachers) => ({
  type: ON_UPDATE_TEACHERS,
  teachers
})
