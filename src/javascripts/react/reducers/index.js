import { combineReducers } from 'redux'
import { routerStateReducer as router } from 'redux-router'


import user from './user'
import storage from './storage'
import {creators, authors, mantras} from './data'



const rootReducer = combineReducers({
  creators,
  authors,
  mantras,
  storage,
  user,
  router
})

export default rootReducer