require('whatwg-fetch')

export const REQUEST_MANTRAS = 'REQUEST_MANTRAS'
export const RECEIVE_MANTRAS = 'RECEIVE_MANTRAS'

export const RECEIVE_MANTRAS_AUTHORS = 'RECEIVE_MANTRAS_AUTHORS'
export const RECEIVE_MANTRAS_CREATORS = 'RECEIVE_MANTRAS_CREATORS'

export const INVALIDATE_REQUEST = 'INVALIDATE_REQUEST'
export const CHANGE_CURSOR = 'CHANGE_CURSOR'


export const API_ROOT = 'https://infinite-dusk-6191.herokuapp.com/api/v1/'
export const API_TYPE = '.json'
const SubDataReceive = {
  "authors": RECEIVE_MANTRAS_AUTHORS,
  "creators": RECEIVE_MANTRAS_CREATORS,
  "mantras": RECEIVE_MANTRAS
}

export function changeCursor(cursor) {
  return {
    type: CHANGE_CURSOR,
    cursor
  }
}

function requestMantras() {
  return {
    type: REQUEST_MANTRAS
  }
}

function fetchSubData(dataName, dispatch) {
  return fetch(`${API_ROOT}${dataName}${API_TYPE}`)
          .then(response => response.json())
          .then(json => dispatch(
            {
              type: SubDataReceive[dataName],
              data: json,
              receivedAt: Date.now()
            }
          ))
}

function fetchData() {
  return dispatch => {
    dispatch(requestMantras())


    let keysSubDataReceive = Object.keys(SubDataReceive)
    let SubDataCount = 0
    keysSubDataReceive.forEach( SubDataName => 
      fetchSubData(SubDataName, dispatch).then( data => {
        if (++SubDataCount >= keysSubDataReceive.length) {
          fetchSubData('mantras', dispatch)}
      })
    )


  }
}

function shouldFetchData(state) {
  const mantras = state.mantras
  if (!mantras) {
    return true
  }
  if (mantras.get('isFetching')) {
    return false
  }
  return mantras.get('didInvalidate')
}

export function fetchDataIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchData(getState())) {
      return dispatch(fetchData())
    }
  }
}