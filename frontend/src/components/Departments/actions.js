import { ON_UPDATE_DEPTS } from './constants'

export const onUpdateDepts = (dept) => ({
  type: ON_UPDATE_DEPTS,
  dept
})
