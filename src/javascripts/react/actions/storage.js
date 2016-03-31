export const GET_COUNT_VISITS_USER = 'GET_COUNT_VISITS_USER'
export const SET_STATUS_WELCOM_DIALOG = 'SET_STATUS_WELCOM_DIALOG'

export const SHOW_CREATORS_INFO = 'SHOW_CREATORS_INFO'
export const HIDE_CREATORS_INFO = 'HIDE_CREATORS_INFO'
export const TOOGLE_CREATORS_INFO = 'TOOGLE_CREATORS_INFO'


function IsJsonString(str) {
  try {
      JSON.parse(str)
  } catch (e) {
      return false
  }
  return true
}

export function getCountVisitsUser() {
  let storage = localStorage.storage && IsJsonString(localStorage.storage) ? JSON.parse(localStorage.storage) : {}

  storage['countVisitsUser'] = storage['countVisitsUser'] ? ++storage['countVisitsUser'] : 1

  localStorage.storage = JSON.stringify(storage)
  
  return {
    type: GET_COUNT_VISITS_USER,
    countVisitsUser: storage['countVisitsUser']
  }
}

export function setStatusWelcomDialog(status) {
  return {
    type: SET_STATUS_WELCOM_DIALOG,
    status
  }
}


export function showCreatorsInfo() {
  return {
    type: SHOW_CREATORS_INFO
  }
}

export function hideCreatorsInfo() {
  return {
    type: HIDE_CREATORS_INFO
  }
}

export function toogleCreatorsInfo() {
  return {
    type: TOOGLE_CREATORS_INFO
  }
}