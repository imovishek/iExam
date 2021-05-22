import { SET_IS_COLLAPSED, SET_NAVIGATION_TAB } from './constants'

export const setNavigaitonTabAction = (key) => ({
  type: SET_NAVIGATION_TAB,
  key
})

export const onSetNavbarCollapsed = (isCollapsed) => ({
  type: SET_IS_COLLAPSED,
  isCollapsed,
})

