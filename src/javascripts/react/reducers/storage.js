import Immutable, { Map, List, fromJS } from 'immutable'
import {
  GET_COUNT_VISITS_USER, SET_STATUS_WELCOM_DIALOG,
  SHOW_CREATORS_INFO, HIDE_CREATORS_INFO, TOOGLE_CREATORS_INFO
} from '../actions/storage'


export default function storage(state = Map({
  countVisitsUser: 0,
  showWelcomModal: false,
  showCreatorInfo: false
}), action) {
  switch (action.type) {
    case GET_COUNT_VISITS_USER:
      return state
        .set('countVisitsUser', action.countVisitsUser)
        .set('showWelcomModal', action.countVisitsUser > 1 ? false : true)

    case SET_STATUS_WELCOM_DIALOG:
      return state
        .set('showWelcomModal', !!action.status)

    case SHOW_CREATORS_INFO:
      return state.set('showCreatorInfo', true)

    case HIDE_CREATORS_INFO:
      return state.set('showCreatorInfo', false)

    case TOOGLE_CREATORS_INFO:
      return state
        .set('showCreatorInfo', !state.get('showCreatorInfo'))


    default:
      return state
  }
}