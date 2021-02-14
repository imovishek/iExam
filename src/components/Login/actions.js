import { SET_USER } from './constants'

export const setUserAction = (user) => ({
  type: SET_USER,
  user
})
