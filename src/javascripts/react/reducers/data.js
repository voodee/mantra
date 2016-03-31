import Immutable, { Map, List, fromJS } from 'immutable'
import {
  RECEIVE_MANTRAS_AUTHORS, RECEIVE_MANTRAS_CREATORS,
  REQUEST_MANTRAS, RECEIVE_MANTRAS,
  INVALIDATE_REQUEST, CHANGE_CURSOR
} from '../actions'

function customImmutablefromJS(data) {
  return Immutable.Map(data.reduce(function(previous, current) { 
          previous[ current.id ] = current
          return previous
        }, {}))
}

function validationCursor(state, cursor) {
  if (state.get('items').size == 0)
    return true

  return Math.min(Math.max(cursor*1, 0), state.get('items').size*1 - 1) == cursor*1
}


export function creators(state = Immutable.Map(), action) {
  switch (action.type) {
    case RECEIVE_MANTRAS_CREATORS:
      return customImmutablefromJS(action.data)

    default:
      return state
  }
}

export function authors(state = Map(), action) {
  switch (action.type) {
    case RECEIVE_MANTRAS_AUTHORS:
      return customImmutablefromJS(action.data)

    default:
      return state
  }
}


export function mantras(state = Map({
  isFetching: false,
  didInvalidate: true,
  items: List()
}), action) {
  switch (action.type) {
    case INVALIDATE_REQUEST:
      return state.set('didInvalidate', true)

    case CHANGE_CURSOR:
      if (validationCursor(state, action.cursor))
        return state
                 .set('cursorOld', state.get('cursor'))
                 .set('cursor', action.cursor)
      return state       

    case REQUEST_MANTRAS:
      return state
               .set('isFetching', true)
               .set('didInvalidate', false)

    case RECEIVE_MANTRAS:
      // let items = customImmutablefromJS(action.data)
      // let listIds = List(items.keySeq().toArray())

      let items = fromJS(action.data)
      let cursor = state.get('cursor')
      if (!validationCursor(state, cursor))
        cursor = items.size - 1

      return state
               .set('isFetching', false)
               .set('didInvalidate', false)
               .set('items', items)
               .set('cursor', cursor)
               .set('cursorOld', cursor)
               .set('lastUpdated', action.receivedAt)

    default:
      return state
  }
}