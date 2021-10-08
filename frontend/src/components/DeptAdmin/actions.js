import { ON_UPDATE_DEPTADMINS } from './constants'

export const onUpdateDeptAdmins = (deptAdmins) => ({
  type: ON_UPDATE_DEPTADMINS,
  deptAdmins
})
