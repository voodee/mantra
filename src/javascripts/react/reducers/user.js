import Immutable, { Map, List, fromJS } from 'immutable'

import {
  CHANGE_EMAIL, RECEIVE_EMAIL_ANSWER,
  CHANGE_USER_MANTRA, RECEIVE_USER_MANTRA_ANSWER
} from '../actions/User'



function email(state = Map( 
    { value: '', error: false, errorMsg: '', isComplete: false }
  ), action) {

  switch (action.type) {
    case CHANGE_EMAIL:
      return state
        .set('value', action.email)
        .set('error', false)

    case RECEIVE_EMAIL_ANSWER:
      if (action.data.status >= 200 && action.data.status < 300) {
        return state
          .set('error', false)
          .set('isComplete', true)

      } else {
        return state
          .set('error', true)
          .set('errorMsg', action.data.json['email'][0])
    
      }

    default:
      return state
  }    
}

function mantra(state = Map( 
    { name: '', company: '', industry: '', site: '', explanation: '', error: false, errorMsg: '', isComplete: false  } 
  ), action) {

  switch (action.type) {
    case CHANGE_USER_MANTRA:
      return action.data
        .set('error', false)

    case RECEIVE_USER_MANTRA_ANSWER:
      return state
        .set('error', false)
        .set('isComplete', true)

    default:
      return state
  }    
}

export default function user(state = Map({ 
  email: Map({ value: '', error: false, errorMsg: '', isComplete: false }), 
  mantra: Map({ name: '', company: '', industry: '', site: '', explanation: '', error: false, errorMsg: '', isComplete: false  } ) 

}), action) {
  switch (action.type) {

    case CHANGE_EMAIL:
    case RECEIVE_EMAIL_ANSWER:
      return state.set('email', email(state.get('email'), action))
      

    case CHANGE_USER_MANTRA:
    case RECEIVE_USER_MANTRA_ANSWER:
      return state.set('mantra', mantra(state.get('mantra'), action))


    default:
      return state
  }
}