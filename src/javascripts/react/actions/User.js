require('whatwg-fetch')

export const CHANGE_EMAIL = 'CHANGE_EMAIL'
export const SENDING_EMAIL = 'SENDING_EMAIL'
export const RECEIVE_EMAIL_ANSWER = 'RECEIVE_EMAIL_ANSWER'

export const CHANGE_USER_MANTRA = 'CHANGE_USER_MANTRA'
export const SENDING_USER_MANTRA = 'SENDING_USER_MANTRA'
export const RECEIVE_USER_MANTRA_ANSWER = 'RECEIVE_USER_MANTRA_ANSWER'

import { API_ROOT, API_TYPE } from './index'


export function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    email
  }
}

function sendingEmail() {
  return {
    type: SENDING_EMAIL
  }
}

function receiveEmailAnswer(json, status) {
  return {
    type: RECEIVE_EMAIL_ANSWER,
    data: {json, status}
  }
}

export function sendEmail(email) {

  return dispatch => {
    dispatch(sendingEmail())

    let data = new FormData()
    data.append('subscribe[email]', email)
    let status = 201

    return fetch(`${API_ROOT}subscribes${API_TYPE}`, {
        method: 'post',
        body: data
      })
      .then(response => {
        status = response.status
        return response.json()
      })
      .then( json => dispatch(receiveEmailAnswer(json, status)))
      // .catch(error => dispatch(receiveEmailAnswer({}, status)))
  }
}












export function changeUserMantra(data) {
  return {
    type: CHANGE_USER_MANTRA,
    data
  }
}

function sendingUserMantra() {
  return {
    type: SENDING_USER_MANTRA
  }
}

function receiveUserMantraAnswer(json, status) {
  return {
    type: RECEIVE_USER_MANTRA_ANSWER,
    data: {json, status}
  }
}

export function sendUserMantra(data) {
  return dispatch => {
    dispatch(receiveUserMantraAnswer({}, 201))
  }
  

  // return dispatch => {
  //   dispatch(sendingUserMantra())

  //   let data = new FormData()
  //   // data.append('proposal[email]', email)
  //   let status = 201

  //   return fetch(`${API_ROOT}proposals${API_TYPE}`, {
  //       method: 'post',
  //       body: data
  //     })
  //     .then(response => {
  //       status = response.status
  //       return response.json()
  //     })
  //     .then( json => dispatch(receiveEmailAnswer(json, status)))
  // }
}